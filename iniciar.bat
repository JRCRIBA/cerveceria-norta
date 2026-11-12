@echo off
title Cerveceria Norta OS - Servidor Local
cd /d "%~dp0"
echo ==================================================
echo   Iniciando Cerveceria Norta OS...
echo   URL: http://127.0.0.1:3000
echo ==================================================

set "PY_EXE=C:\Users\Julio Cristancho\AppData\Local\Python\pythoncore-3.14-64\python.exe"
if not exist "%PY_EXE%" set "PY_EXE=python"

echo Abriendo navegador en http://127.0.0.1:3000...
start http://127.0.0.1:3000

echo Iniciando servidor en primer plano...
"%PY_EXE%" "%~dp0servidor.py"
pause
