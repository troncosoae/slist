const Router = require('koa-router');

const User = require('./db/User')

const router = new Router();

router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
  })
  .get('/index', async (ctx, next) => {
    await ctx.render('index', {
      body: 'this is body'
    });
  })
  .get('/form', async (ctx, next) => {
    await ctx.render('form', {});
  })
  .post('/form', async (ctx, next) => {
    let post_info = ctx.request.body;
    console.log(post_info);
    
    if (!post_info.name || !post_info.age || !post_info.nationality) {
        ctx.body = {message: 'wrong info'}
    } else {
        ctx.body = ctx.request.body;
        let newUser = new User({
            name: post_info.name,
            age: post_info.age,
            nationality: post_info.nationality
        });
        newUser.save((err, res) => {
            if (err) {
                ctx.body = {message: 'error'}
            } else {
                ctx.body = {
                    message: 'error',
                    content: post_info
                }
            }
        });
    }
    await ctx.render('form', {});
  })
  .get('/list', async (ctx, next) => {
    let response = null;
    await User.find((err, res) => {
        if (err) {
            console.log(err);
        }
        response = res;
    });
    await ctx.render('list', {
        users: response ? response:[],
    })
  })

  module.exports = router;