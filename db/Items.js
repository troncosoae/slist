const client = require('./config')

let Items = {
    getAll: () => {
        let response
        client.connect()
        client.query('SELECT * FROM personas;', (err, res) => {
            // console.log(err, res)
            if (err) {
                response = err
                return err
            } else {
                response = res.rows
            }
            client.end()
        })
        return response
    }
}

module.exports = Items;
