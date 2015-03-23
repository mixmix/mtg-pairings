var path = require('path')
var http = require('http')
var fs = require('fs')
var extract = require('pdf-text-extract')
var formidable = require('formidable')

var isProd = process.env.NODE_ENV === 'production'

//var filePath = path.join(__dirname, 'seatings.pdf')
var dataStore = {}

//this is temporary till file upload is up:
function pdfToDataStore(filename) { 
  extract(filename, function (err, pages) {
    if (err) {
      console.dir(err)
      dataStore['error'] = JSON.stringify(err, null, 2)
      return
    }

    dataStore['lines'] = pages.join('\n').split('\n')
  })
}

function handler(req, res) {
  if (req.url === '/') {
    res.writeHead(200, {'content-type': 'text/html'})
    fs.createReadStream('./index.html').pipe(res)
  }
  else if (req.url === '/app.js') {
    fs.createReadStream('./build/client.js').pipe(res)
  }
  else if (req.url === '/styles.css') {
    fs.createReadStream('./styles.css').pipe(res)
  }
  else if (req.url === '/api/pdf-data') {
    res.writeHead(200, {'content-type': 'application/json'})
    res.write(JSON.stringify(dataStore, null, 2))
    res.end()
  }
  else if (req.url === '/api/update') {
    //check it's a POST

    var form = new formidable.IncomingForm()
    form.on('file', function(name, file) {
      if (file.type === 'application/pdf') pdfToDataStore(file.path)
    })

    form.parse(req, function(err, fields, files) {
      res.writeHead(302, {'Location': '/', })
      res.end()
    })
  }
  else {
    res.writeHead(404)
    res.end()
  }

}


function startServer() {
  var port = process.env.PORT || 5000
  http.createServer( handler ).listen(port)
}

startServer()
