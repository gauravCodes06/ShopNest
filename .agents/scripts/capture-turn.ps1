# capture-turn.ps1
# Reads the hook payload from stdin, extracts the last USER_INPUT prompt
# and the last PLANNER_RESPONSE from the transcript, then appends them
# to the session log in .agent-logs/.
#
# Called by hooks.json on PreInvocation (captures prompt) and Stop (captures response).
# The EVENT_TYPE env var is set by the hook command string: "prompt" or "response"

param(
    [string]$EventType  # "prompt" or "response"
)

# Read stdin JSON
$rawStdin = [Console]::In.ReadToEnd()
$payload = $rawStdin | ConvertFrom-Json -ErrorAction SilentlyContinue

if (-not $payload) {
    # Return valid empty output so agent isn't blocked
    Write-Output '{}'
    exit 0
}

$conversationId  = $payload.conversationId
$transcriptPath  = $payload.transcriptPath
$modelName       = $payload.modelName
$workspacePaths  = $payload.workspacePaths

# Resolve workspace root (first entry)
$workspaceRoot = $workspacePaths[0]
$logDir = Join-Path $workspaceRoot ".agent-logs"

if (-not (Test-Path $logDir)) {
    New-Item -ItemType Directory -Force -Path $logDir | Out-Null
}

# Session log file: named by conversation id and date
$utcNow    = [DateTime]::UtcNow
$dateStr   = $utcNow.ToString("yyyy-MM-dd")
$sessionShort = $conversationId.Substring(0, 8)
$logFile   = Join-Path $logDir "${dateStr}_${sessionShort}.md"

# ------------------------------------------------------------------ #
# Read transcript to find the relevant entry
# ------------------------------------------------------------------ #
# Prefer the full (untruncated) transcript
$transcriptPathFull = $transcriptPath -replace 'transcript\.jsonl$', 'transcript_full.jsonl'
if (Test-Path $transcriptPathFull) { $transcriptPath = $transcriptPathFull }

if (-not $transcriptPath -or -not (Test-Path $transcriptPath)) {
    Write-Output '{}'
    exit 0
}

$lines = Get-Content -Path $transcriptPath -Encoding UTF8 -ErrorAction SilentlyContinue

if (-not $lines) {
    Write-Output '{}'
    exit 0
}

# Parse all JSONL lines
$steps = @()
foreach ($line in $lines) {
    $line = $line.Trim()
    if ($line -eq '') { continue }
    try {
        $step = $line | ConvertFrom-Json -ErrorAction Stop
        $steps += $step
    } catch {}
}

$timestamp = $utcNow.ToString("yyyy-MM-ddTHH:mm:ss.fffZ")

if ($EventType -eq "prompt") {
    # Find the last USER_INPUT step
    $userSteps = $steps | Where-Object { $_.type -eq "USER_INPUT" }
    if (-not $userSteps) {
        Write-Output '{}'
        exit 0
    }
    $lastUser = $userSteps | Select-Object -Last 1
    $promptText = $lastUser.content
    if (-not $promptText) { $promptText = ($lastUser | ConvertTo-Json -Depth 5) }

    # Count existing exchanges to get num
    $existing = 0
    if (Test-Path $logFile) {
        $existingContent = Get-Content $logFile -Raw -ErrorAction SilentlyContinue
        $matches = [regex]::Matches($existingContent, '\[LOG_ENTRY type=PROMPT')
        $existing = $matches.Count
    }
    $entryNum = $existing + 1

    # Write header if file doesn't exist
    if (-not (Test-Path $logFile)) {
        $header = @"
---
session_id: $conversationId
date: $dateStr
author: unknown
model: $modelName
tool: antigravity-ide
project: ml-challenge
total_exchanges: 0
first_prompt_time: $timestamp
last_prompt_time: $timestamp
---

# Session Log - $dateStr

Session: ``$sessionShort`` | Project: ``ml-challenge`` | Author: ``unknown``

---

"@
        Set-Content -Path $logFile -Value $header -Encoding UTF8 -NoNewline
    }

    # Append the prompt entry
    $entry = @"

[LOG_ENTRY type=PROMPT num=$entryNum session=$sessionShort]
timestamp: $timestamp
model: $modelName

$promptText


"@
    Add-Content -Path $logFile -Value $entry -Encoding UTF8 -NoNewline

} elseif ($EventType -eq "response") {
    # Find the last PLANNER_RESPONSE step
    $responseSteps = $steps | Where-Object { $_.type -eq "PLANNER_RESPONSE" }
    if (-not $responseSteps) {
        Write-Output '{}'
        exit 0
    }
    $lastResponse = $responseSteps | Select-Object -Last 1
    $responseText = $lastResponse.content
    if (-not $responseText) { $responseText = ($lastResponse | ConvertTo-Json -Depth 5) }

    # Count existing RESPONSE entries for num
    $existing = 0
    if (Test-Path $logFile) {
        $existingContent = Get-Content $logFile -Raw -ErrorAction SilentlyContinue
        $matches = [regex]::Matches($existingContent, '\[LOG_ENTRY type=RESPONSE')
        $existing = $matches.Count
    }
    $entryNum = $existing + 1

    # Append the response entry
    $entry = @"

[LOG_ENTRY type=RESPONSE num=$entryNum session=$sessionShort]
timestamp: $timestamp
model: $modelName

$responseText


"@
    Add-Content -Path $logFile -Value $entry -Encoding UTF8 -NoNewline
}

# Always output valid JSON for the hook framework
Write-Output '{}'
