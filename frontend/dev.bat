@echo off

:: Node & npm Pfade setzen
set NODE_PATH=C:\Users\DE132919\local-dev\aws-hackathon\frontend\node-v22.19.0-win-x64
set NPM_PATH=%NODE_PATH%\node_modules\npm\bin
set PATH=%NODE_PATH%;%NPM_PATH%;%PATH%

echo Node version:
node -v
echo NPM version:
npm -v

:: Ins Projekt wechseln
@REM cd /d "C:\Users\DE132919\OneDrive - pwc\Eigener Bereich\Anderes\Eigene Dev Projekte\DFB Chatbot\MVP\chatbot-client\chatbot-frontend-pwc"

:: Dev Server starten
npm run dev
