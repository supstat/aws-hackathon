@echo off
REM Navigate to your project directory
cd "C:\Users\DE132919\local-dev\aws-hackathon\frontend\src"

REM Start the Python HTTP server
python -m http.server
start http://localhost:8000

REM Pause the window to keep it open in case of errors
pause

