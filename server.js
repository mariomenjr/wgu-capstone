// server.js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const model = require('./model');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
  const wgu = await model();

  createServer((req, res) => {
    req.wgu = wgu;
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    handle(req, res, parse(req.url, true));
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  })
});
