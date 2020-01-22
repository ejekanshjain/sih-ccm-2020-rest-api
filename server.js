require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const app = express()

const db = require('./db/db')
const utilities = require('./utilities/utilities')
const sendMail = require('./utilities/sendMail')

app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 3000



// Main APIS

// login
app.post('/api/login', (req, res) => {
    if (req.body.email == null || req.body.password == null || req.body.email == '' || req.body.password == '') return res.status(400).send(JSON.stringify({ status: "400", message: "Enter email and password" }))
    let sql = `SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`
    db.query(sql, (err, results) => {
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

// Get all Lawyers
app.get('/api/lawyers', (req, res) => {
    let sql = `SELECT * FROM lawyers`
    db.query(sql, (err, results) => {
        if (err) throw err
        res.status(200).send(JSON.stringify({ status: "200", response: results }))
    })
})

// Get Lawyer by id
app.get('/api/lawyers/:id', (req, res) => {
    let sql = `SELECT * FROM lawyers WHERE id = '${req.params.id}'`
    db.query(sql, (err, results) => {
        if (err) throw err
        res.status(200).send(JSON.stringify({ status: "200", response: results }))
    })
})

// Add lawyer
app.post('/api/lawyers', (req, res) => {
    if (req.body.phoneNumber) req.body.phoneNumber = parseInt(req.body.phoneNumber)
    if (req.body.aadharNumber) req.body.aadharNumber = parseInt(req.body.aadharNumber)
    if (req.body.license) req.body.license = parseInt(req.body.license)
    let sql = `SELECT * FROM users WHERE email = '${req.body.email}'`
    db.query(sql, (err, results) => {
        if (err) throw err
        if (results.length != 0) return res.status(400).send(JSON.stringify({ status: "400", message: "Already Exists" }))
        let pass = utilities.random(8)
        sendMail(req.body.email, `Your Login Credentials`, `EMAIL: ${req.body.email} and PASSWORD: ${pass}`)
        let userObj = {
            id: `lawyer-${utilities.randomID()}`,
            email: req.body.email,
            password: pass,
            role: 2
        }
        let lawyerObj = {
            id: userObj.id,
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            aadharNumber: req.body.aadharNumber,
            license: req.body.license
        }
        let sql1 = `INSERT INTO users SET ?`
        db.query(sql1, userObj, (err, results) => {
            if (err) throw err
        })
        let sql2 = `INSERT INTO lawyers SET ?`
        db.query(sql2, lawyerObj, (err, results) => {
            if (err) throw err
        })
        res.status(201).send(JSON.stringify({ status: "201", message: "Added Lawyer Successfully" }))
    })
})

// Delete Lawyer
app.delete('/api/lawyers/:id', (req, res) => {
    let sql1 = `DELETE FROM users WHERE id = '${req.params.id}'`
    db.query(sql1, (err, results) => {
        if (err) throw err
    })
    let sql2 = `DELETE FROM clients WHERE id = '${req.params.id}'`
    db.query(sql1, (err, results) => {
        if (err) throw err
    })
    res.status(200).send(JSON.stringify({ status: "200", message: "Deleted Client Successfully" }))
})



// Get all Clients
app.get('/api/clients', (req, res) => {
    let sql = `SELECT * FROM clients`
    db.query(sql, (err, results) => {
        if (err) throw err
        res.status(200).send(JSON.stringify({ status: "200", response: results }))
    })
})

// Get Client by id
app.get('/api/lawyers/:id', (req, res) => {
    let sql = `SELECT * FROM clients WHERE id = '${req.params.id}'`
    db.query(sql, (err, results) => {
        if (err) throw err
        res.status(200).send(JSON.stringify({ status: "200", response: results }))
    })
})

// Add Client
app.post('/api/clients', (req, res) => {
    if (req.body.phoneNumber) req.body.phoneNumber = parseInt(req.body.phoneNumber)
    if (req.body.aadharNumber) req.body.aadharNumber = parseInt(req.body.aadharNumber)
    let sql = `SELECT * FROM users WHERE email = '${req.body.email}'`
    db.query(sql, (err, results) => {
        if (err) throw err
        if (results.length != 0) return res.status(400).send(JSON.stringify({ status: "400", message: "Already Exists" }))
        let pass = utilities.random(8)
        sendMail(req.body.email, `Your Login Credentials`, `EMAIL: ${req.body.email} and PASSWORD: ${pass}`)
        let userObj = {
            id: `client-${utilities.randomID()}`,
            email: req.body.email,
            password: pass,
            role: 3
        }
        let clientObj = {
            id: userObj.id,
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            aadharNumber: req.body.aadharNumber
        }
        let sql1 = `INSERT INTO users SET ?`
        db.query(sql1, userObj, (err, results) => {
            if (err) throw err
        })
        let sql2 = `INSERT INTO clients SET ?`
        db.query(sql2, clientObj, (err, results) => {
            if (err) throw err
        })
        res.status(201).send(JSON.stringify({ status: "201", message: "Added Client Successfully" }))
    })
})

// Delete Client
app.delete('/api/clients/:id', (req, res) => {
    let sql1 = `DELETE FROM users WHERE id = '${req.params.id}'`
    db.query(sql1, (err, results) => {
        if (err) throw err
    })
    let sql2 = `DELETE FROM clients WHERE id = '${req.params.id}'`
    db.query(sql1, (err, results) => {
        if (err) throw err
    })
    res.status(200).send(JSON.stringify({ status: "200", message: "Deleted Lawyer Successfully" }))
})

// Get all Case / by client id and lawyer id
app.get('/api/cases', (req, res) => {
    let sql = `SELECT * FROM cases INNER JOIN clients ON clients.id = cases.clientId INNER JOIN lawyers ON lawyers.id = cases.lawyerId`
    if (req.query.client) sql += ` WHERE clientId = '${req.query.client}'`
    if (req.query.lawyer) sql += ` WHERE lawyerId = '${req.query.lawyer}'`
    db.query(sql, (err, results) => {
        if (err) throw err
        res.status(200).send(JSON.stringify({ status: "200", response: results }))
    })
})

// Get case by id
app.get('/api/cases/:id', (req, res) => {
    let sql = `SELECT * FROM cases WHERE id = '${req.params.id}'`
    db.query(sql, (err, results) => {
        if (err) throw err
        res.status(200).send(JSON.stringify({ status: "200", response: results }))
    })
})

// Add case
app.post('/api/cases', (req, res) => {
    let caseObj = {
        id: `case-${utilities.randomID()}`,
        fileId: req.body.fileId,
        type: req.body.type,
        lawyerId: req.body.lawyerId,
        clientId: req.body.clientId,
        createdAt: utilities.Now()
    }
    let sql = `INSERT INTO cases SET ?`
    db.query(sql, caseObj, (err, results) => {
        if (err) throw err
        res.status(201).send(JSON.stringify({ status: "200", message: "Added Case" }))
    })
})

// Get all hearings / by case id
app.get('/api/hearings', (req, res) => {
    let sql = `SELECT * FROM hearings`
    if (req.query.case) sql = `SELECT * FROM cases INNER JOIN hearings WHERE cases.id = '${req.query.case}'`
    db.query(sql, (err, results) => {
        if (err) throw err
        res.status(200).send(JSON.stringify({ status: "200", response: results }))
    })
})

// Get hearing by id
app.get('/api/hearings/:id', (req, res) => {
    let sql = `SELECT * FROM hearings WHERE id = '${req.query.id}'`
    db.query(sql, (err, results) => {
        if (err) throw err
        res.status(200).send(JSON.stringify({ status: "200", response: results }))
    })
})

// Add hearing
app.post('/api/hearings', (req, res) => {
    let hearingObj = {
        id: `hearing-${utilities.randomID()}`,
        caseId: req.body.caseId,
        summary: req.body.summary,
        createdAt: utilities.Now()
    }
    let sql = `INSERT INTO hearings SET ?`
    db.query(sql, caseObj, (err, results) => {
        if (err) throw err
        res.status(201).send(JSON.stringify({ status: "200", message: "Added Case" }))
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