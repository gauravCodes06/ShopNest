@echo off
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\capture-turn.ps1" %*
