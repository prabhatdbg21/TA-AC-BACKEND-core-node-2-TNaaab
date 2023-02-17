/*
Project folder
  - server.js
  - form.html(html form)

form.html is a basic html form with multiple inputs. Each input except input of `type=submit` must contain `name` attribute which is the key for value submitted on that specific input.
- name
- email
- age

lastly also add an `input type=submit` to submit the form

Write code inside `server.js` to
- create a basic server
- add listener on port 5678
- display the form.html page on `/form` route using `GET` http method
- once the form is submitted, capture the data on server side using `data/end` event on request object
- make sure to add `method` and `action` attribute to `HTML form` in form.html
- send captured data in response as html page 

You have to basically handle 2 routes
1. to display the form data -> GET on `/form` route
2. to capture data from form and display it -> POST on `/form` route

##### Note:-
- action attribute determines the route which will be requested on server side
- method defines HTTP method used to submit the form(ideally POST)
*/

var http = require ('http');
var qs = require('querystring');
var fs = require('fs')

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var store = '';
    req.on('data', (chunk) => {
        store = store + chunk;
    });
    req.on('end', () => {
        if(req.method === 'GET' && req.url === '/form') {
            res.setHeader('Content-Type', "test/html");
            fs.createReadStream('./form.html').pipe(res);
        }
        if(req.method === 'POST' && req.url === '/form') {
            var parsedData = qs.parse(store);
            res.setHeader('Content-Type', "test/html");
            res.write(`<h1>${parsedData.name}</h1>`);
            res.write(`<h2>${parsedData.email}</h2>`);
            res.write(`<h3>${parsedData.age}</h3>`);
            res.end()
        }
    })
}

server.listen(5678, () => {
    console.log('server listening on port 5678')
})