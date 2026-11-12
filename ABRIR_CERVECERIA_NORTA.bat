@echo off
title Cerveceria NORTA OS - Sistema de Gestion Cervecera
cd /d "%~dp0"

echo =========================================================================
echo               CERVECERIA NORTA OS v5.0 - INICIADOR MAESTRO
echo =========================================================================
echo.
echo [1/3] Verificando estado del servidor local en http://127.0.0.1:3000...

powershell -NoProfile -Command "try { $r = (Invoke-WebRequest -Uri 'http://127.0.0.1:3000' -TimeoutSec 1 -UseBasicParsing).StatusCode; if ($r -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }" >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [OK] El servidor ya se encuentra activo en el puerto 3000.
    goto LAUNCH_BROWSER
)

echo [2/3] Servidor inactivo. Iniciando servidor HTTP Dual-Stack...

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

echo [3/3] Esperando inicializacion de la plataforma...
set RETRIES=0
:WAIT_LOOP
timeout /t 1 /nobreak >nul
powershell -NoProfile -Command "try { $r = (Invoke-WebRequest -Uri 'http://127.0.0.1:3000' -TimeoutSec 1 -UseBasicParsing).StatusCode; if ($r -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }" >nul 2>&1
if %ERRORLEVEL% equ 0 goto LAUNCH_BROWSER

set /a RETRIES+=1
if %RETRIES% lss 5 goto WAIT_LOOP

echo.
echo [ADVERTENCIA] El servidor no respondio en 5 segundos.
echo Abriendo aplicacion en modo directo standalone...
start "" "%~dp0index.html"
goto FINAL_MESSAGE

:LAUNCH_BROWSER
echo.
echo [OK] Desplegando Cerveceria NORTA OS en el navegador...
powershell -NoProfile -Command "$url = 'http://127.0.0.1:3000'; Start-Process $url; Start-Sleep -Milliseconds 600; $wshell = New-Object -ComObject WScript.Shell; $wshell.AppActivate('NORTA'); $wshell.AppActivate('Edge'); $wshell.AppActivate('Chrome')" >nul 2>&1
start http://127.0.0.1:3000

:FINAL_MESSAGE
echo.
echo =========================================================================
echo   CERVECERIA NORTA OS HA SIDO ABIERTA CON EXITO
echo =========================================================================
echo   Ubicacion: %~dp0
echo   URL Web  : http://127.0.0.1:3000
echo.
echo   Si la ventana no paso al frente de su pantalla, acceda desde su
echo   navegador favorito a: http://127.0.0.1:3000
echo =========================================================================
echo.
echo Presione cualquier tecla para cerrar esta consola (el sistema sigue activo).
pause >nul
exit
