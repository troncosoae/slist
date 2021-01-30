const { Pool } = require('pg')
require('custom-env').env(true)

let pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tester_db',
    password: 'fMXE9mp4UovG6u',
    port: 5432,
})

pool.query('SELECT * FROM Items', (err, res) => {
    console.log(err, res)
    console.log(process.env.USER)
    pool.end()
})