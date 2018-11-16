const http2 = require('spdy')
const logger = require('morgan')
const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const publicPath = 'src'

app.use(logger('dev'))
app.use(express.static(publicPath))
app.get('/', function (req, res) {
    push('/img/yunxin1.png', res, 'image/png')
    push('/img/yunxin2.png', res, 'image/png')
    push('/js/log3.js', res, 'application/javascript')
    res.setHeader('Content-Type', 'text/html')
    res.sendFile(__dirname + '/src/page1.html')
})
var options = {
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.crt'),
    protocols: [ 'h2', 'spdy/3.1', 'http/1.1' ]
}
  
http2.createServer(options, app).listen(8080, () => {
    console.log(`Server is listening on https://127.0.0.1:8080 .You can open the URL in the browser.`)
})

function push (reqPath, target, type) {
    let content = fs.readFileSync(path.join(__dirname, publicPath, reqPath))
    let stream = target.push(reqPath, {
        status: 200,
        method: 'GET',
        request: {
            accept: '*/*'
        },
        response: {
            'content-type': type
        }
    })
    stream.on('error', function() {})
    stream.end(content)
}