import os
import sys
import socketserver
from http.server import SimpleHTTPRequestHandler

class SPARequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        dist_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist")
        super().__init__(*args, directory=dist_dir, **kwargs)

    def do_GET(self):
        fs_path = self.translate_path(self.path)
        # If requested path is not an actual file, route to /index.html (SPA client-side routing)
        if not os.path.isfile(fs_path):
            self.path = "/index.html"
        try:
            return super().do_GET()
        except (ConnectionResetError, BrokenPipeError):
            pass

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-cache")
        try:
            super().end_headers()
        except (ConnectionResetError, BrokenPipeError):
            pass

    def log_message(self, format, *args):
        sys.stderr.write("%s - - [%s] %s\n" % (self.address_string(), self.log_date_time_string(), format % args))

class ThreadedHTTPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True

if __name__ == "__main__":
    port = 3000
    try:
        with ThreadedHTTPServer(("0.0.0.0", port), SPARequestHandler) as httpd:
            print(f"UdyamSetu Production SPA Server listening on http://localhost:{port}/", flush=True)
            httpd.serve_forever()
    except Exception as e:
        print(f"Server error: {e}", flush=True)
