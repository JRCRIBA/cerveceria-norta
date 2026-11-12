@echo off
title Instalador de Accesos Directos - Cerveceria NORTA OS
cd /d "%~dp0"
echo =========================================================================
echo  Instalando accesos directos de Cerveceria NORTA OS en el Escritorio...
echo =========================================================================
echo.

copy /y "%~dp0Cerveceria NORTA OS.url" "%USERPROFILE%\Desktop\Cerveceria NORTA OS.url" >nul 2>&1
copy /y "%~dp0Cerveceria NORTA OS Directo.url" "%USERPROFILE%\Desktop\Cerveceria NORTA OS Directo.url" >nul 2>&1
copy /y "%~dp0ABRIR_CERVECERIA_NORTA.bat" "%USERPROFILE%\Desktop\ABRIR_CERVECERIA_NORTA.bat" >nul 2>&1

:: Crear lanzador BAT directo en el Escritorio
(
echo @echo off
echo cd /d "%~dp0"
echo call ABRIR_CERVECERIA_NORTA.bat
) > "%USERPROFILE%\Desktop\Iniciar Cerveceria NORTA.bat"

echo.
echo [OK] Accesos actualizados exitosamente en el Escritorio:
echo     1. ABRIR_CERVECERIA_NORTA.bat (Iniciador maestro con activacion visual)
echo     2. Cerveceria NORTA OS.url (Abre http://127.0.0.1:3000)
echo     3. Cerveceria NORTA OS Directo.url (Abre index.html de G:\Mi unidad\...)
echo.
pause
