const http2 = require('spdy')
const logger = require('morgan')
const express = require('express')
const app = express()
const fs = require('fs')

app.use(logger('dev'))
app.use(express.static('src'))
app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html')
    res.sendfile(__dirname + '/src/index.html')
})

app.get('/pushy', (req, res) => {
    var stream = res.push('/main.js', {
        status: 200, // optional
        method: 'GET', // optional
        request: {
        accept: '*/*'
        },
        response: {
        'content-type': 'application/javascript'
        }
    })
    stream.on('error', function() {
    })
    stream.end('alert("hello from push stream!")')
    res.end('<script src="/main.js"></script>')
})
var options = {
    key: fs.readFileSync('./ca/server.key'),
    cert: fs.readFileSync('./ca/server.crt')
}
  
http2.createServer(options, app).listen(8080, () => {
    console.log(`Server is listening on https://localhost:8080 .You can open the URL in the browser.`)
})