const Router = require('koa-router');
const mongoose = require('mongoose');

const UserTest = require('./db/UserTest');
const List = require('./db/List');

const router = new Router();

router
  .get('/', async (ctx, next) => {
    await ctx.render('home', {});
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
        let newUser = new UserTest({
            name: post_info.name,
            age: post_info.age,
            nationality: post_info.nationality,
            items: ['item1', 'item2', 'item3']
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
  .get('/listTest', async (ctx, next) => {
    let response = null;
    await UserTest.find((err, res) => {
        if (err) {
            console.log(err);
        }
        response = res;
    });
    console.log(response);
    await ctx.render('listTest', {
        users: response ? response:[],
    })
  })
  .post('/newList', async (ctx, next) => {
    let post_info = ctx.request.body;
    console.log(post_info);
    let listId = 0;
    
    if (!post_info.name) {
        ctx.body = {message: 'wrong info'}
        await ctx.render('home', {});
    } else {
      try {
        let newList = new List({
          code: 'code',
          name: 'name',
          users: [],
          items: []
        });
        let saveList = await newList.save();
        listId = saveList._id;
      } catch(err) {
        console.log(err);
      }
    }
    console.log('listId');
    console.log(listId);
    ctx.redirect(`/list/${listId}`);
  })
  .get('/list/:listId', async (ctx, next) => {
    console.log(ctx.params);
    let response = null;
    await List.find(mongoose.Types.ObjectId(ctx.params.listId), (err, res) => {
      if (err) {
          console.log(err);
      }
      response = res;
    })
    console.log('response');
    console.log(response);
    if (response) {
      response = response[0];
      await ctx.render('list', {
          listId: response._id,
          name: response.name,
          items: response.items,
      })
    } else {
      await ctx.render('list', {
          listId: null,
          name: null,
          items: null,
      })
    }
  })

  module.exports = router;