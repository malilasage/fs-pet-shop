'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var fs = require('fs');


app.use(function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    if(err) {
      throw err;
    }
    var pets = JSON.parse(data);
    res.send(pets);
  });
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;
