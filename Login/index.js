const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs')
const port = 3000

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))

app.post('/', (req, res) => {
    if(!(req.body.name && req.body.password)){
        return res.send('Please enter name/password')
    }
    fs.readFile('users.json', 'utf8', (err, data) => {
        if(err){
            return err
        }
        data = JSON.parse(data)
        console.log(data)
        user = data.filter((v) => {
            return (v.username === req.body.name && v.password === req.body.password)
        })

        if(user.length > 0){
            return res.send("You're in!")
        }
        return res.send('Invalid username/password')
    })
})

app.listen(port, () => console.log(port))