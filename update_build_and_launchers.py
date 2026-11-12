import os

base_dir = r'C:\Users\Julio Cristancho\.gemini\antigravity\scratch\cerveceria-norta'

# 1. Upgrade servidor.py to support Next.js server if npm/node is present or Python server
servidor_py = """import http.server
import socketserver
import webbrowser
import os
import subprocess
import time

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

if __name__ == "__main__":
    node_exe = r'C:\Program Files\nodejs\node.exe'
    npm_cmd = r'C:\Program Files\nodejs\npm.cmd'
    next_cli = os.path.join(DIRECTORY, 'node_modules', 'next', 'dist', 'bin', 'next')
    
    # Intentar iniciar Next.js App Router Server si node_modules existe
    if os.path.exists(node_exe) and os.path.exists(next_cli):
        print("==================================================")
        print("  Servidor Next.js App Router (NORTA OS 5.0)")
        print(f"  URL: http://127.0.0.1:{PORT}")
        print("==================================================")
        try:
            cmd = [node_exe, next_cli, "dev", "-p", str(PORT)]
            subprocess.Popen(cmd, cwd=DIRECTORY)
            time.sleep(2)
            webbrowser.open(f"http://127.0.0.1:{PORT}")
            sys.exit(0)
        except Exception as e:
            print("Fallback a servidor HTTP Python:", e)

    # Fallback a servidor HTTP Python
    httpd = None
    for port in [3000, 8080, 8000]:
        try:
            socketserver.TCPServer.allow_reuse_address = True
            httpd = socketserver.TCPServer(("127.0.0.1", port), Handler)
            PORT = port
            break
        except Exception:
            continue

    if httpd:
        url = f"http://127.0.0.1:{PORT}"
        print(f"==================================================")
        print(f"  Servidor Cervecería NORTA OS Iniciado (Puerto {PORT})")
        print(f"  URL: {url}")
        print(f"==================================================")
        try:
            webbrowser.open(url)
        except Exception:
            pass
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\\nServidor detenido.")
"""

with open(os.path.join(base_dir, 'servidor.py'), 'w', encoding='utf-8') as f:
    f.write(servidor_py)

print("servidor.py actualizado para Next.js con fallback a Python.")
