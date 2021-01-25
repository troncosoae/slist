const Router = require('koa-router');
const mongoose = require('mongoose');
const mongodb = require('mongodb');

const UserTest = require('./db/UserTest');
const List = require('./db/List');

const router = new Router();

router
  .get('/', async (ctx, next) => {
    console.log("/[GET]: ctx.request.body")
    console.log(ctx.request.body)
    await ctx.render('home', {})
  })
  .get('/newList', async (ctx, next) => {
    console.log("newList[GET]: ctx.request.body")
    console.log(ctx.request.body)
    await ctx.render('newList', {})
  })
  .post('/newList', async (ctx, next) => {
    console.log("newList[POST]: ctx.request.body")
    console.log(ctx.request.body)
    let user = ctx.request.body.user
    let newList = new List({
        users: [user],
        items: [
          {
            name: 'milk',
            quantity: 3,
            checked: false,
          },
        ],
    });
    newList.save((err, res) => {
      if (err) {
        console.log(err)
      }
    })
    console.log("newList: ")
    console.log(newList)
    console.log(newList._id)
    await ctx.redirect(`/list/${newList._id}`)
  })
  .post('/getList', async (ctx, next) => {
    console.log("getList[POST]: ctx.request.body")
    console.log(ctx.request.body)
    let _id = ctx.request.body._id
    let user = ctx.request.body.user
    if (!mongodb.ObjectID.isValid(_id)) {
      await ctx.redirect('/', {})
      ctx.get()
      return
    }
    query = {
      _id: mongodb.ObjectID(_id)
    }
    let exists = false
    await List.findOne(query, (err, res) => {
      if (res) {
        exists = true
      }
    })
    console.log(`exists: ${exists}`)
    if (exists) {
      await ctx.redirect(`/list/${_id}`)
      return
    }
    await ctx.redirect('/', {})
  })
  .get('/list/:_id', async (ctx, next) => {
    console.log("list/:_id[GET]: ctx.request.body")
    console.log(ctx.request.body)
    console.log("list/:_id[GET]: ctx.params")
    console.log(ctx.params)
    let _id = ctx.params._id
    console.log(`_id: ${_id}`)
    
    if (!mongodb.ObjectID.isValid(_id)) {
      await ctx.redirect('/', {})
      return
    }
    query = {
      _id: mongodb.ObjectID(_id)
    }
    let list;
    await List.findOne(query, (err, res) => {
      if (res) {
        list = res;
      }
    })

    console.log('list...')
    console.log(list)
    let clicked = 0

    await ctx.render('list', {
      items: [...list.items],
      users: [...list.users],
      _id: list._id,
      onCheck: () => {
        console.log('h')
      }
    })
  })
  .post('/addToList', async (ctx, next) => {
    console.log("addToList[POST]: ctx.request.body")
    console.log(ctx.request.body)
    let _id = ctx.request.body._id
    console.log(`_id: ${_id}`)
    item = {
      name: ctx.request.body.name,
      quantity: ctx.request.body.quantity,
      checked: false,
    }
    
    if (!mongodb.ObjectID.isValid(_id)) {
      await ctx.redirect('/', {})
      return
    }
    query = {
      _id: mongodb.ObjectID(_id)
    }
    let list
    await List.findOne(query, (err, res) => {
      if (res) {
        list = res;
      }
    })
    
    console.log('prev list')
    console.log(list)

    list.items = [
      item,
      ...list.items,
    ]
    console.log('new list')
    console.log(list)

    await List.findOneAndUpdate(query, list, (err, res) => {})

    await ctx.redirect(`/list/${_id}`)
  })

module.exports = router;
