const mysql = require('mysql')
const dotenv = require('dotenv').config()

// Create connection to mysql database
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sih_ccm_2020'
})

// Open the MySQL connection
try {
    connection.connect((err) => {
        if (err) throw err
    })
} catch (err) {
    console.log("Error connecting to DB", err)
}

module.exports = connection