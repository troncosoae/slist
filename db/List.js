const db = require('./../config')

let listSchema = db.Schema({
    code: String,
    name: String,
    users: Array,
    items: Array
});

let List = db.model("list", listSchema);

module.exports = List;