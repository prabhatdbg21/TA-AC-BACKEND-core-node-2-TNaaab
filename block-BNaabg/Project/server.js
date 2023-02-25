var http = require ('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    const userDir = __dirname + "/users/";
    console.log(userDir); //    /Users/prabhat/Desktop/CODE/NODEJS/TA-AC-BACKEND-core-node-2-TNaaab/block-BNaabg/Project/users/
    var store = '';
    req.on('data', (chunk) => {
        store = store + chunk;
    });
    req.on('end', () => {
        if (req.url === "/users" && req.method === "POST"){
            var username = JSON.parse(store);
            console.log(store);
            console.log (username);
            res.end(store); 
        }
        else if(req.method === 'POST' && req.url === '/form') {
            var parsedData = qs.parse(store);
            res.setHeader('Content-Type', "test/html");
            res.write(`<h1>${parsedData.name}</h1>`);
            res.write(`<h2>${parsedData.email}</h2>`);
            res.write(`<h3>${parsedData.age}</h3>`);
            res.end()
        }
        else {
            res.writeHead(404, {'Content-Type': "text/html"}); 
            res.end('<h2>Page not Found</h2>');
        }
    })
}

server.listen(3001, () => {
    console.log('server listening on port 3001')
})