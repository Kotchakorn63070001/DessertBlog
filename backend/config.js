const mysql = require("mysql2/promise")

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'JLRhlq32',
    database: 'dessertblog1'
})

module.exports = pool