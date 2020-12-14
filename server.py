import http.server
import socketserver
from mimetypes import types_map
import os 

class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        curr_dir = os.getcwd()

        if self.path == '/':
            self.path = 'index.html'

        fname,ext = os.path.splitext(self.path)
        if ext == ".css":
            with open(curr_dir + self.path) as f:
                self.send_response(200)
                self.send_header('Content-type', types_map[ext])
                self.end_headers()
                self.wfile.write(bytes(f.read(), "utf8"))

        return http.server.SimpleHTTPRequestHandler.do_GET(self)
    
PORT = 8080
Handler = MyHttpRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
