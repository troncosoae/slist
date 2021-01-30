const db = require('./index');

console.log(db)

db.query('select * from items WHERE $1', ['TRUE'], () => {console.log('s')})
