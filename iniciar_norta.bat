@echo off
title Cerveceria NORTA OS - Iniciador Autonomo
cd /d "%~dp0"

echo =========================================================================
echo               CERVECERIA NORTA OS v5.0 - INICIO AUTOMATICO
echo =========================================================================
echo.

:: 1. Verificar si el puerto 3000 ya responde
powershell -NoProfile -Command "try { $r = (Invoke-WebRequest -Uri 'http://127.0.0.1:3000' -TimeoutSec 1 -UseBasicParsing).StatusCode; if ($r -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }" >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [STATUS] Servidor ya activo en puerto 3000. Abriendo navegador...
    goto LAUNCH
)

:: 2. Iniciar servidor en segundo plano
echo [STATUS] Servidor HTTP inactivo. Iniciando servidor en segundo plano...
set "PY_EXE=C:\Users\Julio Cristancho\AppData\Local\Python\pythoncore-3.14-64\pythonw.exe"
if exist "%PY_EXE%" (
    start "" "%PY_EXE%" "%~dp0servidor.py"
) else (
    if exist "%~dp0iniciar_oculto.vbs" (
        wscript.exe "%~dp0iniciar_oculto.vbs"
    ) else (
        start "" pythonw servidor.py 2>nul || start /min "Servidor NORTA OS" python servidor.py
    )
)

:: 3. Espera activa de hasta 5 segundos con reintentos
echo [STATUS] Esperando respuesta del servidor local...
set RETRIES=0
:WAIT_LOOP
timeout /t 1 /nobreak >nul
powershell -NoProfile -Command "try { $r = (Invoke-WebRequest -Uri 'http://127.0.0.1:3000' -TimeoutSec 1 -UseBasicParsing).StatusCode; if ($r -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }" >nul 2>&1
if %ERRORLEVEL% equ 0 goto LAUNCH

set /a RETRIES+=1
if %RETRIES% lss 5 goto WAIT_LOOP

echo.
echo [ADVERTENCIA] Servidor no respondio a tiempo. Abriendo en modo local...
start "" "%~dp0index.html"
goto SUCCESS

:LAUNCH
echo [SUCCESS] Servidor respondiendo 200 OK en http://127.0.0.1:3000.
powershell -NoProfile -Command "$url = 'http://127.0.0.1:3000'; Start-Process $url; Start-Sleep -Milliseconds 600; $wshell = New-Object -ComObject WScript.Shell; $wshell.AppActivate('NORTA'); $wshell.AppActivate('Edge'); $wshell.AppActivate('Chrome')" >nul 2>&1
start http://127.0.0.1:3000

:SUCCESS
echo.
echo =========================================================================
echo   APLICACION ABIERTA EXITOSAMENTE (http://127.0.0.1:3000)
echo =========================================================================
timeout /t 3 >nul
exit
