/*
Q1. Suppose we have 3 files inside a directory on desktop
The structure is
  - node(folder)
    - app.js
    - server.js
    - index.html
You are currently inside server.js
 */

//  - capture absolute path of `server.js`(itself)
console.log( __filename);    //   /Users/prabhat/Desktop/CODE/NODEJS/TA-AC-BACKEND-core-node-2-TNaaab/block-BNaabe/node/server.js

//  - get absolute path of `app.js` 
console.log( __dirname + '/app.js');    //   /Users/prabhat/Desktop/CODE/NODEJS/TA-AC-BACKEND-core-node-2-TNaaab/block-BNaabe/node/app.js

//  - get realtive path of `index.html`
console.log('./index.html');           //    ./index.html

//  - get absolute path of `index.html` using `path module`
var path = require('path');
var indexPath = path.join(__dirname, 'index.html');
console.log(indexPath);          //          /Users/prabhat/Desktop/CODE/NODEJS/TA-AC-BACKEND-core-node-2-TNaaab/block-BNaabe/node/index.html


/*
Q2. Create a server using http
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

var server = http.createServer(handleRequest2);

function handleRequest2(req, res) {
    if(req.method === 'POST' && req.url === '/') {
        var store = '';
        req.on('data', (chunk) => {
            store = store + chunk;
        });
        req.on('end', () => {
            res.statusCode = 201;
            res.end(store); 
        })
    }
}

server.listen(7001, () => {
    console.log('server listening on port 7001')
})


/*
Q3. Follow above steps with form data from postman instead of json data.
- once data has been captured, send only captain's name in response.
*/

var http = require ('http');
var qs = require('querystring')

var server = http.createServer(handleRequest3);

function handleRequest3(req, res) {
    if(req.method === 'POST' && req.url === '/') {
        var store = '';
        req.on('data', (chunk) => {
            store = store + chunk;
        });
        req.on('end', () => {
            var parsedData = qs.parse(store);
            res.end(JSON.stringify(parsedData.captain));
        })
    }
}

server.listen(6000, () => {
    console.log('server listening on port 6000')
})



/*
Q4. Create server which can handle both json/form data without specifying which format of data is being received.
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

var server = http.createServer(handleRequest4);

function handleRequest4(req, res) {
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
Q5. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.
- format of json data is {name: your name, email: "", }
- Html response format is <h1>Name</h1><h2>email</h2>
 */
var http = require ('http');
var qs = require('querystring')

var server = http.createServer(handleRequest5);

function handleRequest5(req, res) {
    var dataFormat = req.headers['content-type']
    var store = '';
    req.on('data', (chunk) => {
        store = store + chunk;
    });
    req.on('end', () => {
        if(dataFormat === "application/json") {
            var jsonData = JSON.parse(store);
            console.log(store)
            /*
            {
                "name": "Prabhat",
                "email": "prabhatdbg21@gmail.com"
            }
             */
            console.log(jsonData)
            /*
            { name: 'Prabhat', email: 'prabhatdbg21@gmail.com' }
            */
            res.setHeader('Content-Type', "test/html")
            res.end(`<h1>${jsonData.name}</h1><h2>${jsonData.email}</h2>`); 
        }
    })
}

server.listen(8000, () => {
    console.log('server listening on port 8000')
})



/*
Q6. Follow above question with form data containing fields i.e name and email. 
- Parse form-data using `querystring` module
- respond with HTML page containing only email from data in H2 tag.
*/
var http = require ('http');
var qs = require('querystring')

var server = http.createServer(handleRequest6);

function handleRequest6(req, res) {
    var dataFormat = req.headers['content-type']
    var store = '';
    req.on('data', (chunk) => {
        store = store + chunk;
    });
    req.on('end', () => {
        if(dataFormat === "application/x-www-form-urlencoded") {
            var parsedData = qs.parse(store);
            res.setHeader('Content-Type', "test/html");
            res.end(`<h1>${parsedData.name}</h1><h2>${parsedData.email}</h2>`); 
            // res.end(`<h1>${JSON.stringify(parsedData.name)}</h1><h2>${JSON.stringify(parsedData.email)}</h2>`); 
        }
    })
}

server.listen(8500, () => {
    console.log('server listening on port 8500')
})