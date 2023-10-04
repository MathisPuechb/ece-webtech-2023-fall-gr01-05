// Define a string constant concatenating strings
const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' + 
'    <body>' +
'       <p>Hello World!</p>' +
'    </body>' +
'</html>'
 const url = require('url')
 const qs = require('querystring')

const serverHandle = function (req, res) {

  const route = url.parse(req.url)
  const path = route.pathname 
  const params = qs.parse(route.query)
  const path = url.parse(req.url).pathname
  console.log(path)
  const queryParams =qs.parse(url.pars(req.url).query)
  console.log(queryParams)
  res.writeHead(200, {'Content-Type': 'text/html'})
  if (path === '/hello' && 'name' in params) {
    res.write('Hello ' + params['name'])
  } else {
    res.write('Hello anonymous')
  }
  
  res.write(content)
  res.end()
}

http
.createServer(serverHandle)
.listen(8080)