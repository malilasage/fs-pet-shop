'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];

if (cmd === 'read') {
  //
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    var pets = JSON.parse(data);

    if(!process.argv[3]) {
      console.log(pets);
    }
    else if(process.argv[3]) {
      var index = path.basename(process.argv[3]);
      if (index > pets.length - 1 || index < 0) {
        console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
        process.exit(1);
      }
      console.log(pets[index]);
    }

  });
}

else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    var pets = JSON.parse(data);
    var pet = {'age': Number(process.argv[3]), 'kind': process.argv[4], 'name': process.argv[5]};

    if (!process.argv[5]) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }

    pets.push(pet);

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }

      console.log(pet);
    });
  });
}

else if (cmd === 'update') {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    var pets = JSON.parse(data);
    var index = process.argv[3];
    var age = process.argv[3];
    var kind = process.argv[3];
    var name = process.argv[3];

    if(!process.argv[6]){
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }
    pets[process.argv[3]] = {'age': Number(process.argv[4]), 'kind': process.argv[5], 'name': process.argv[6]};

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
    });

    console.log(pets[process.argv[3]]);
  });
}

else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
