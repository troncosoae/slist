const db = require('./db/index');

// db.query('SELECT * FROM items', [], (err, res) => {
//     if (err) {
//         console.log(err)
//     }
//     console.log(res)
// })

// db.pool.query()

db.pool.query('SELECT * FROM items', (err, res) => {
    console.log(err, res)
    pool.end()
  })

// const res = await db.pool.query('SELECT * FROM items;')
// await pool.end()
// console.log(res)

