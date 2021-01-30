const db = require('./config');

// let items = 3
db.query('select * from items', [], (err, res) => {
    console.log(res)
})
