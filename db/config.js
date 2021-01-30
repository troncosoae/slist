const { Pool } = require('pg')
require('dotenv').config();

let pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PSWD,
    port: process.env.PORT,
})

module.exports = {
    pool: pool,
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
}
