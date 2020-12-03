const db = require('./../config')

let userTestSchema = db.Schema({
    name: String,
    age: Number,
    nationality: String,
    items: Array
});

let UserTest = db.model("usertest", userTestSchema);

module.exports = UserTest;
