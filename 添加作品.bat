@echo off
chcp 65001 >nul
cd /d "%~dp0"

if not exist node_modules\formidable (
  echo 第一次运行，正在安装依赖，请稍等...
  call npm install
)

echo 正在启动本地服务...
start "添加作品 - 本地服务（关掉这个窗口即可停止）" /min cmd /c "npm run admin"

timeout /t 2 /nobreak >nul
start "" http://localhost:5175
