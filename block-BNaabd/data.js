var http = require ('http');
var qs = require('querystring')

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var dataFormat = req.headers['content-type']
    var store = '';
    req.on('data', (chunk) => {
        store = store + chunk;
    });
    req.on('end', () => {
        if(req.method === 'POST' && dataFormat === "application/json") {
            var parsedData = JSON.parse(store);
            res.end(store); 
        }
        if(req.method === 'POST' && dataFormat === "application/x-www-form-urlencoded") {
            var parsedData = qs.parse(store);
            res.end(JSON.stringify(parsedData));
        }
    })
}

server.listen(7001, () => {
    console.log('server listening on port 7k')
})