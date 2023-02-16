/*
Q. Create a server using http
- handle post method on '/' route
- send json data on it from postman

```js
// data format is
{
  team: 'kxip',
  players: 18,
  captain: 'KL Rahul'
}
```
- capture data from request on server side using data and end event on request object
- when end event fires, send entire captured data in response with status code 201.
 */
var http = require ('http');
var qs = require('querystring')

var server = http.createServer(handleRequest1);

function handleRequest1(req, res) {
    //var dataFormat = req.headers['content-type']
    var store = '';
    req.on('data', (chunk) => {
        store = store + chunk;
    });
    req.on('end', () => {
        if(req.method === 'POST' && req.url === '/json') {
            res.writeHead(201, {'Content-Type': "application/json"});
            res.end(store); 
        }
    })
}

server.listen(7001, () => {
    console.log('server listening on port 7001')
})




/*
Q. Follow above steps with form data from postman instead of json data.
- once data has been captured, send only captain's name in response.
*/

var http = require ('http');
var qs = require('querystring')

var server = http.createServer(handleRequest2);

function handleRequest2(req, res) {
    //var dataFormat = req.headers['content-type']
    var store = '';
    req.on('data', (chunk) => {
        store = store + chunk;
    });
    req.on('end', () => {
        if(req.method === 'POST' && req.url === '/form') {
            var parsedData = qs.parse(store);
            res.end(JSON.stringify(parsedData.captain));
        }
    })
}

server.listen(6000, () => {
    console.log('server listening on port 6000')
})





/*
Q. Create server which can handle both json/form data without specifying which format of data is being received.
- add listener on port 9000
- use `data/end` event to capture json/form data
- use `req.headers['Content-Type']` to check data format
- parse respective data format i.e. json/form 
- send entire data in response
- data sent from postman should have fields:
  - city
  - state
  - country
  - pin
*/

var http = require ('http');
var qs = require('querystring')

var server = http.createServer(handleRequest3);

function handleRequest3(req, res) {
    var dataFormat = req.headers['content-type']
    var store = '';
    req.on('data', (chunk) => {
        store = store + chunk;
    });
    req.on('end', () => {
        if(dataFormat === "application/json") {
            res.end(store); 
        }
        if(dataFormat === "application/x-www-form-urlencoded") {
            var parsedData = qs.parse(store);
            res.end(JSON.stringify(parsedData));
        }
    })
}

server.listen(9000, () => {
    console.log('server listening on port 9000')
})





/*
Q. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.
- format of json data is {name: your name, email: "", }
- Html response format is <h1>Name</h1><h2>email</h2>
 */
var http = require ('http');
var qs = require('querystring')

var server = http.createServer(handleRequest4);

function handleRequest4(req, res) {
    var dataFormat = req.headers['content-type']
    var store = '';
    req.on('data', (chunk) => {
        store = store + chunk;
    });
    req.on('end', () => {
        if(dataFormat === "application/json") {
            var parsedData = qs.parse(store);
            /*   this part not working
            console.log(parsedData)
            res.setHeader('Content-Type', "test/html")
            res.end(`<h1>${JSON.stringify(parsedData.name)}</h1><h2>${JSON.stringify(parsedData.email)}</h2>`); 
            */
        }
    })
}

server.listen(8000, () => {
    console.log('server listening on port 8000')
})




/*
Q. Follow above question with form data containing fields i.e name and email. 
- Parse form-data using `querystring` module
- respond with HTML page containing only email from data in H2 tag.
*/
var http = require ('http');
var qs = require('querystring')

var server = http.createServer(handleRequest2);

function handleRequest2(req, res) {
    var dataFormat = req.headers['content-type']
    var store = '';
    req.on('data', (chunk) => {
        store = store + chunk;
    });
    req.on('end', () => {
        if(dataFormat === "application/x-www-form-urlencoded") {
            var parsedData = qs.parse(store);
            res.setHeader('Content-Type', "test/html")
            res.end(`<h1>${JSON.stringify(parsedData.name)}</h1><h2>${JSON.stringify(parsedData.email)}</h2>`); 
        }
    })
}

server.listen(8500, () => {
    console.log('server listening on port 8500')
})