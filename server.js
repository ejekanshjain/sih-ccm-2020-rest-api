require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()

app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT

const conn = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sih_ccm_2020'
})
conn.connect(err => {
    if (err) throw err
    console.log('DB connected...')
})

app.get('/', (req, res) => {
    res.status(200).send(`Server up and running`)
})

app.get('/api', (req, res) => {
    res.status(200).send(`API server up and running`)
})


app.listen(port, () => {
    console.log(`Server started on port ${port}...`)
})