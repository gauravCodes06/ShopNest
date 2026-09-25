# capture-turn.ps1
# Reads the hook payload from stdin, extracts the last USER_INPUT prompt
# or last PLANNER_RESPONSE from the transcript, then appends to the session log.
#
# Called by hooks.json on PreInvocation (captures prompt) and Stop (captures response).
# Each session gets its own log file: .agent-logs/YYYY-MM-DD_<short-id>.md

param(
    [string]$EventType  # "prompt" or "response"
)

# Read stdin JSON
$rawStdin = [Console]::In.ReadToEnd()
$payload = $rawStdin | ConvertFrom-Json -ErrorAction SilentlyContinue

if (-not $payload) {
    Write-Output '{}'
    exit 0
}

$conversationId = $payload.conversationId
$transcriptPath = $payload.transcriptPath
$modelName      = $payload.modelName
$workspacePaths = $payload.workspacePaths

# Resolve workspace root (first entry)
$workspaceRoot = $null
if ($workspacePaths -and $workspacePaths.Count -gt 0) {
    $workspaceRoot = $workspacePaths[0]
}
if (-not $workspaceRoot -or -not (Test-Path $workspaceRoot)) {
    $workspaceRoot = (Split-Path -Parent (Split-Path -Parent $PSScriptRoot))
}
if (-not $workspaceRoot -or -not (Test-Path $workspaceRoot)) {
    $workspaceRoot = Get-Location
}

$logDir = Join-Path $workspaceRoot ".agent-logs"

if (-not (Test-Path $logDir)) {
    New-Item -ItemType Directory -Force -Path $logDir | Out-Null
}

# One log file per session -- avoids cross-session collisions
$utcNow       = [DateTime]::UtcNow
$dateStr      = $utcNow.ToString("yyyy-MM-dd")
$sessionShort = $conversationId.Substring(0, 8)
$logFile      = Join-Path $logDir "${dateStr}_${sessionShort}.md"

# Prefer the full (untruncated) transcript
$transcriptPathFull = $transcriptPath -replace 'transcript\.jsonl$', 'transcript_full.jsonl'
if (Test-Path $transcriptPathFull) { $transcriptPath = $transcriptPathFull }

if (-not $transcriptPath -or -not (Test-Path $transcriptPath)) {
    Write-Output '{}'
    exit 0
}

# Determine which step type we are looking for
$targetType = if ($EventType -eq "prompt") { "USER_INPUT" } else { "PLANNER_RESPONSE" }

# Retry up to 5 times with 1-second waits -- transcript may not be flushed yet
$lastStep = $null
for ($retry = 0; $retry -lt 5; $retry++) {
    $lines = Get-Content -Path $transcriptPath -Encoding UTF8 -ErrorAction SilentlyContinue
    if ($lines) {
        $steps = @()
        foreach ($line in $lines) {
            $line = $line.Trim()
            if ($line -eq '') { continue }
            try {
                $step = $line | ConvertFrom-Json -ErrorAction Stop
                $steps += $step
            } catch {}
        }
        if ($targetType -eq "USER_INPUT") {
            $matched = @($steps | Where-Object { $_.type -eq "USER_INPUT" })
        } else {
            $matched = @($steps | Where-Object { $_.type -eq "PLANNER_RESPONSE" -and $_.content })
            if ($matched.Count -eq 0) {
                $matched = @($steps | Where-Object { $_.type -eq "PLANNER_RESPONSE" })
            }
        }
        if ($matched.Count -gt 0) {
            $lastStep = $matched | Select-Object -Last 1
            break
        }
    }
    if ($retry -lt 4) { Start-Sleep -Seconds 1 }
}

if (-not $lastStep) {
    Write-Output '{}'
    exit 0
}

$stepIdx     = $lastStep.step_index
$timestamp   = $utcNow.ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
$contentText = $lastStep.content
if (-not $contentText) { $contentText = ($lastStep | ConvertTo-Json -Depth 5) }

# Write header if file does not exist
if (-not (Test-Path $logFile)) {
    $header = "---`nsession_id: $conversationId`ndate: $dateStr`nauthor: unknown`nmodel: $modelName`ntool: antigravity-ide`nproject: ml-challenge`ntotal_exchanges: 0`nfirst_prompt_time: $timestamp`nlast_prompt_time: $timestamp`n---`n`n# Session Log - $dateStr`n`nSession: ``$sessionShort`` | Project: ``ml-challenge`` | Author: ``unknown```n`n---`n`n"
    Set-Content -Path $logFile -Value $header -Encoding UTF8 -NoNewline
}

# Deduplication check: check if this step_index has already been logged for this entry type
$entryTag = if ($EventType -eq "prompt") { "PROMPT" } else { "RESPONSE" }
if (Test-Path $logFile) {
    $existingContent = Get-Content $logFile -Raw -Encoding UTF8 -ErrorAction SilentlyContinue
    if ($existingContent -and ($existingContent -match "\[LOG_ENTRY type=$entryTag [^\]]*step=$stepIdx\]" -or $existingContent -match "step_index: $stepIdx`r?`n")) {
        Write-Output '{}'
        exit 0
    }
}

# Count existing entries of this type in THIS session file only
$existing = 0
if (Test-Path $logFile) {
    $existingContent = Get-Content $logFile -Raw -Encoding UTF8 -ErrorAction SilentlyContinue
    $existing = ([regex]::Matches($existingContent, "\[LOG_ENTRY type=$entryTag")).Count
}
$entryNum = $existing + 1

# Append the entry
$entry = "`n[LOG_ENTRY type=$entryTag num=$entryNum session=$sessionShort step=$stepIdx]`ntimestamp: $timestamp`nmodel: $modelName`nstep_index: $stepIdx`n`n$contentText`n`n"
Add-Content -Path $logFile -Value $entry -Encoding UTF8 -NoNewline

Write-Output '{}'
