var express = require('express');
var app = express();
var fs = require("fs");
var path = require("path");

app.use(express.static(__dirname));

app.get('/', function(request, response){
    response.sendfile('index.html');
});

var server = app.listen(7001, function () {

  var host = "localhost"
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port)

})