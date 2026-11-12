import urllib.request
import urllib.error
import time
import subprocess
import sys
import os

def check_server(url="http://127.0.0.1:3000"):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Norta-Auditor/1.0'})
        with urllib.request.urlopen(req, timeout=3) as resp:
            status = resp.getcode()
            headers = dict(resp.info())
            content_length = len(resp.read(500))
            return status, content_length
    except Exception as e:
        return None, str(e)

if __name__ == "__main__":
    print("==========================================================")
    print("   PRUEBA DE VERIFICACION HTTP 200 OK - CERVECERIA NORTA   ")
    print("==========================================================")
    
    # 1. Probar si el servidor ya responde
    status, info = check_server()
    if status == 200:
        print(f"[EXITO] Servidor HTTP activo en http://127.0.0.1:3000 -> HTTP {status} OK.")
    else:
        print(f"[INFO] Servidor no respondiendo ({info}). Intentando verificar servidor.py...")
        # Arrancar servidor en proceso secundario para prueba
        script_dir = os.path.dirname(os.path.abspath(__file__))
        proc = subprocess.Popen([sys.executable, "servidor.py"], cwd=script_dir)
        time.sleep(2)
        status, info = check_server()
        if status == 200:
            print(f"[EXITO] Servidor python iniciado correctamente -> HTTP {status} OK!")
        else:
            print(f"[ERROR] No se pudo verificar respuesta HTTP 200: {info}")
