const db = require('./../config')

let userSchema = db.Schema({
    name: String,
    age: Number,
    nationality: String
});

let User = db.model("usertest", userSchema);

module.exports = User;
