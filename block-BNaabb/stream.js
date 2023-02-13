var http = require ('http');


var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var store = '';
    req.on('data', (chunk) => {
        store = store + chunk;
    });
    req.on('end', () => {  
        if(req.method === 'POST' && req.url === '/') {
            res.write(store) ;
            res.end() ;
        } 
    })
}

server.listen(3456, () => {
    console.log('server listening on port 3456')
})