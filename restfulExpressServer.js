'use strict';
//why aren't these happening in the same space as pets.js js its because nodemon is only running expressServer.js

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var morgan = require('morgan');
app.use(morgan('short'));

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
    res.send(pets[id]);
  });
})

app.param('age', function(req, res) {
  var age = req.body.age;
  if(isNan(age)){
    return res.sendStatus(400);
  }
})

app.post('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if(err) {
      console.err(err.stack);
      return res.sendStatus(500);
    }
  var pets = JSON.parse(petsJSON);
  var age = Number(req.body.age);
  var kind = req.body.kind;
  var name = req.body.name;

  if(!age || !kind || !name) {
    return res.sendStatus(400);
  }

  var pet = {'age': age, 'kind': kind, 'name':name};
  pets.push(pet);

  var petsJSON = JSON.stringify(pets);
  fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      res.send(pet);
    });
  });
})

app.put('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if(err) {
      console.err(err.stack);
      return res.sendStatus(500);
    }
    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(petsJSON);
    var age = Number(req.body.age);
    var kind = req.body.kind;
    var name = req.body.name;

    if(!age || !kind || !name) {
      return res.sendStatus(400);
    }

    var pet = {'age': age, 'kind': kind, 'name':name};

    pets[id] = pet;

    var petsJSON = JSON.stringify(pets);
    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      res.send(pet);
    });
  });
})

app.delete('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if(err) {
      console.err(err.stack);
      return res.sendStatus(500);
    }
    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(petsJSON);
    var pet = pets.splice(id, 1)[0];

    var petsJSON = JSON.stringify(pets);
    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      res.send(pet);
    });
  });
})

app.patch('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if(err) {
      console.err(err.stack);
      return res.sendStatus(500);
    }
    // if(!req.body) {
      // res.sendStatus(401);g
    // }
    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(petsJSON);
    var key = Object.keys(req.body);
    var value = req.param(key);

    pets[id][key] = value;

    var petsJSON = JSON.stringify(pets);
    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      res.send(pets);
    });
  });
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;
