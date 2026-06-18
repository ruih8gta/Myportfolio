@echo off
rem ===================================================================
rem  Myportfolio ローカル起動チェック用バッチ
rem  - ローカルHTTPサーバーを起動し、ブラウザでポートフォリオを開く
rem  - 終了するにはこのウィンドウで Ctrl+C を押すか、ウィンドウを閉じる
rem ===================================================================

setlocal
cd /d "%~dp0"

set PORT=8765
set URL=http://localhost:%PORT%/index.html

echo.
echo  Myportfolio をローカルで起動します
echo  URL : %URL%
echo  停止: このウィンドウで Ctrl+C
echo.

rem 既定ブラウザでポートフォリオを開く（サーバー起動を少し待つ）
start "" /b cmd /c "timeout /t 1 >nul & start %URL%"

rem Python のHTTPサーバーを起動（python が無ければ py を試す）
where python >nul 2>nul
if %errorlevel%==0 (
    python -m http.server %PORT%
) else (
    py -m http.server %PORT%
)

endlocal
