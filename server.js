require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const db = require('./db/db')

app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 3000

app.post('/api/login', (req, res) => {
})

app.get('/', (req, res) => {
    res.status(200).send(`Server up and running...`)
})

app.get('/api', (req, res) => {
    res.status(200).send(`API server up and running...`)
})


app.listen(port, () => {
    console.log(`Server started on port ${port}...`)
})