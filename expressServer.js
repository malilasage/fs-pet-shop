'use strict';
//why aren't these happening in the same space as pets.js js its because nodemon is only running expressServer.js

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');


app.get('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if(err) {
      console.err(err.stack);
      return res.sendStatus(500);
    }
    var pets = JSON.parse(petsJSON);
    res.send(pets);
  });
});

app.get('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if(err) {
      console.err(err.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
    res.set('Content-Type', 'text/plain');
    res.send(pets[id]);
  });
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;
