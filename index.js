const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8080;
const basePath = __dirname; // Assuming index.js is in the same directory as the HTML files

const server = http.createServer((req, res) => {
  let filePath;

  if (req.url === '/') {
    // Serve index.html for the root URL
    filePath = path.join(basePath, 'index.html');
  } else if (req.url === '/about') {
    // Serve about.html for "/about" URL
    filePath = path.join(basePath, 'about.html');
  } else if (req.url === '/contact-me') {
    // Serve contact-me.html for "/contact-me" URL
    filePath = path.join(basePath, 'contact-me.html');
  } else {
    // Serve 404.html for any other URL
    filePath = path.join(basePath, '404.html');
  }

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File doesn't exist, serve 404.html
      filePath = path.join(basePath, '404.html');
    }

    // Read the file and serve its contents
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading the page');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
  });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
