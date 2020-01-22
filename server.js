require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const db = require('./db/db')

app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 3000



// Main APIS

// login
app.post('/api/login', (req, res) => {
    if (req.body.email == null || req.body.password == null || req.body.email == '' || req.body.password == '') return res.status(400).send(JSON.stringify({ status: "400", message: "Enter email and password" }))
    let sql = `SELECT * FROM users`
    db.query(sql, (err, results) => {
        console.log(results)
        if (err) throw err
        if (results.length == 0) return res.status(400).send(JSON.stringify({ status: "400", message: "Invalid email or password" }))
        let obj = {
            id: results[0].id,
            email: results[0].email,
            role: results[0].role
        }
        res.status(200).send(JSON.stringify({ status: "200", message: "Login Successfull", response: obj }))
    })
})

// End of Main APIS



app.get('/', (req, res) => {
    res.status(200).send(`Server up and running...`)
})

app.get('/api', (req, res) => {
    res.status(200).send(`API server up and running...`)
})

app.listen(port, () => {
    console.log(`Server started on port ${port}...`)
})