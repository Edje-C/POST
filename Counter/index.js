const express = require('express')
const app = express()
const port = 3000;
const fs = require('fs')

app.get('/', (req, res) => {
    res.send('Welcome to my site')
    fs.readFile('counter.json', 'utf8', (err, data) => {
        if(err){
            if(err === 'ENOENT'){
                return fs.writeFile('counter.json', '{"count": "1"}')
            }
        }
        data = JSON.parse(data)
        count = Number(data.count)
        fs.writeFile(`counter.json`, `{"count": "${count+1}"}`)
    })
})

app.post('/reset', (req, res) => {
    fs.writeFile('counter.json', '{"count": "0"}')
})

app.listen(port, () => console.log(port))