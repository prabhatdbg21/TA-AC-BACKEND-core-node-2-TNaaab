var http = require('http');
var fs = require('fs')

http.createServer(function (req, res) {
    reader = fs.createReadStream('readme.txt')
    reader.on('data', function (chunk) {
        console.log(chunk.toString());
    });
    res.end(); 
}).listen(8080);