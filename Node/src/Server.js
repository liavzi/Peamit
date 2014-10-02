var http = require('http');
var server = http.createServer(function(req, res) {
  res.send('Hello World');
});
server.listen(9000);