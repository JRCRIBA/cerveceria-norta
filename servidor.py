import http.server
import socketserver
import webbrowser
import os
import sys
import socket

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class NortaHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map = http.server.SimpleHTTPRequestHandler.extensions_map.copy()
    extensions_map.update({
        '.js': 'application/javascript',
        '.mjs': 'application/javascript',
        '.json': 'application/json',
        '.css': 'text/css',
        '.html': 'text/html; charset=utf-8',
        '.svg': 'image/svg+xml',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.ico': 'image/x-icon',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
    })

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path in ('/', '', '/index', '/index.html'):
            self.path = '/index.html'
        return super().do_GET()

    def log_message(self, format, *args):
        # Suprimir logs verbosos para mayor rendimiento en background
        pass


class DualStackThreadingServer(socketserver.ThreadingTCPServer):
    """
    Servidor TCP multihilo con soporte Dual-Stack (IPv4 e IPv6).
    Escucha en '::' con IPV6_V6ONLY=0 para aceptar simultáneamente
    conexiones IPv4 (127.0.0.1, LAN) e IPv6 (::1, localhost).
    Si IPv6 no está disponible o falla el enlace dual, conmuta limpiamente a 0.0.0.0 (IPv4).
    """
    allow_reuse_address = True
    daemon_threads = True

    def __init__(self, server_address, RequestHandlerClass, bind_and_activate=True):
        port = server_address[1]
        bound = False

        if socket.has_ipv6:
            try:
                self.address_family = socket.AF_INET6
                super().__init__(('::', port), RequestHandlerClass, bind_and_activate=False)
                if hasattr(socket, 'IPPROTO_IPV6') and hasattr(socket, 'IPV6_V6ONLY'):
                    try:
                        self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
                    except (socket.error, OSError):
                        pass
                if bind_and_activate:
                    self.server_bind()
                    self.server_activate()
                bound = True
            except Exception:
                bound = False

        if not bound:
            self.address_family = socket.AF_INET
            super().__init__(('0.0.0.0', port), RequestHandlerClass, bind_and_activate)


def is_port_in_use(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(0.5)
        if s.connect_ex(('127.0.0.1', port)) == 0:
            return True
    if socket.has_ipv6:
        try:
            with socket.socket(socket.AF_INET6, socket.SOCK_STREAM) as s6:
                s6.settimeout(0.5)
                if s6.connect_ex(('::1', port)) == 0:
                    return True
        except Exception:
            pass
    return False


def start_server():
    if is_port_in_use(PORT):
        print(f"[STATUS] El puerto {PORT} ya se encuentra activo y respondiendo.")
        if len(sys.argv) > 1 and sys.argv[1] == '--open':
            webbrowser.open(f"http://127.0.0.1:{PORT}")
        return

    httpd = None
    actual_port = PORT

    for candidate_port in [PORT, 8080, 8000]:
        try:
            httpd = DualStackThreadingServer(('', candidate_port), NortaHandler)
            actual_port = candidate_port
            break
        except Exception:
            continue

    if httpd:
        print(f"[SUCCESS] Servidor Cerveceria NORTA OS activo en http://127.0.0.1:{actual_port}")
        if len(sys.argv) > 1 and sys.argv[1] == '--open':
            try:
                webbrowser.open(f"http://127.0.0.1:{actual_port}")
            except Exception:
                pass
        try:
            httpd.serve_forever()
        except (KeyboardInterrupt, SystemExit):
            print("[INFO] Servidor detenido.")
        finally:
            httpd.server_close()
    else:
        print(f"[ERROR] No se pudo vincular el servidor a ningún puerto disponible.")
        sys.exit(1)


if __name__ == '__main__':
    start_server()
