// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const model = require('./model');

const port = process.env.PORT; 
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
  const sequential = await model();

  createServer((req, res) => {
    req.wgu = { sequential };
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    handle(req, res, parse(req.url, true));
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  })
});
