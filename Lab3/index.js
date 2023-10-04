
const http = require('http')
const url = require('url')
const qs = require('querystring')
// Define a string constant concatenating strings
const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE lb2</title>' +
'    </head>' + 
'    <body>' +
'       <p>Hello there!</p>' +
'    </body>' +
'</html>'



const serverHandle = function (req, res) {

    const path = url.parse(req.url).pathname
    console.log(path)

    const queryParams = qs.parse(url.parse(req.url).query)
    console.log(queryParams)
    

  res.writeHead(200, {'Content-Type': 'text/html'})
  res.write(content)
  res.end()
}

http
.createServer(serverHandle)
.listen(8080)
