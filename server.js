// Dependencies
var express = require('express')
var fs = require('fs')
var app = express()

// Middleware
app.use(express.static('client'))

// Endpoints
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html')
})

app.get('/data', function(req, res) {
    res.json(JSON.parse(fs.readFileSync('./api/data.json', 'utf8')))
})


// Initialize Server
app.listen(3000, function() {
    console.log('App listening on port 3000!')
})
