/*
Q1. Suppose on desktop, inside projects we have 2 folder each with a file
Structure is:-
Desktop
  - projects
    - client(dir)
      - index.js
    - server(dir)
      - app.js

You are currently in server.js

Write code to
  - get relative path of `index.js` 
  - get absolute path of `index.js`
*/

//    - get relative path of `index.js` 
console.log('./client/index.js');

//    - get absolute path of `index.js`
console.log( __dirname + './client/index.js');  



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
*/

var http = require ('http');
var qs = require('querystring')

var server = http.createServer(handleRequest3);

function handleRequest3(req, res) {
    if(req.method === 'GET' && req.url === '/form') {
        var store = '';
        req.on('data', (chunk) => {
            store = store + chunk;
        });
        req.on('end', () => {
            console.log(store)
            //var parsedData = qs.parse(store);
            //res.end(JSON.stringify(parsedData.captain));
        })
    }
}

server.listen(5678, () => {
    console.log('server listening on port 5678')
})