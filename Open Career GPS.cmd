@echo off
rem Double-click this file to open the Career GPS demo in your web browser.
rem It opens the built app (one file, works offline). If it is missing, Claude Code rebuilds it with: cd app ^&^& npm run build
if exist "%~dp0app\dist\index.html" (
  start "" "%~dp0app\dist\index.html"
) else (
  echo The app has not been built yet. Ask Claude Code to run the build.
  pause
)
