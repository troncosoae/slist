const Koa = require('koa');
const Router = require('koa-router');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const path = require('path');
require('dotenv').config();

const router = require('./router');

const app = new Koa();

const PORT = process.env.PORT || 3000;

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  // console.log(ctx)
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// body-parser
app.use(bodyParser());

// use koa views
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
});

// response
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT);

console.log('Server running. ');
console.log(`Listening to port ${PORT}...`);

