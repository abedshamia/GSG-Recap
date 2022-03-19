const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const url = require('url');

const app = http
  .createServer((req, res) => {
    const endPoint = req.url;
    if (endPoint === '/') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.end(data);
        }
      });
    } else if (endPoint === '/style.css') {
      res.writeHead(200, {'Content-Type': 'text/css'});
      fs.readFile(path.join(__dirname, 'public', 'style.css'), (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.end(data);
        }
      });
    } else if (endPoint === '/script.js') {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      fs.readFile(path.join(__dirname, 'public', 'script.js'), (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.end(data);
        }
      });
    }

    if (endPoint === '/students' && req.method === 'GET') {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(
        JSON.stringify({
          students: [
            {
              name: 'John',
              age: 20,
            },
            {
              name: 'Jane',
              age: 21,
            },
            {
              name: 'Jack',
              age: 22,
            },
          ],
        })
      );

      res.end();
    }

    if (req.method === 'POST' && req.url === '/students') {
      const body = [];
      req.on('data', chunk => {
        body.push(chunk);
      });

      req.on('end', () => {
        const user = JSON.parse(body.toString());
        res.writeHead(201, {'Content-Type': 'text/html'});
        res.end(`Hello ${user.name}`);
      });
    }

    if (endPoint !== '/' && endPoint !== '/students' && req.method === 'GET') {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write('<h1>404 Page not found</h1>');
      res.end();
    }
  })
  .listen(3000, () => {
    console.log('Server running on port 3000');
  });

app.on('error', err => {
  console.log(err);
});

console.log(querystring.stringify({search: 'javascript'}));
console.log(url.parse('https://www.codewars.com/users/m4v15/completed'));
module.exports = app;

// difference between querystring and url
// querystring.stringify({search: 'javascript'}), returns key value pairs of the search query, in this case search=javascript, , while url.parse('https://www.codewars.com/users/m4v15/completed') returns an object with the url's components
