var doubles =0;
var triples =0;
var lines = [];

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input2.txt')
});

lineReader.on('line', function (line) {
  lines.push(line);
  var dict = {};
  for (var i = 0; i < line.length; i++) {
    var char = line[i];
    if (!dict[char]) {
      dict[char] = 1;
    } else {
      dict[char] += 1;
    }
  }
  var foundDouble = false;
  var foundTriple = false;
  
  for(var key in dict){
    var value = dict[key];
    if(value == 2) {
      foundDouble = true;
    }
    if(value == 3) {
      foundTriple = true;
    }
  }
  doubles += foundDouble ? 1: 0;
  triples += foundTriple ? 1: 0;

});

lineReader.on('close', function (line) {
  console.log(`Total (${doubles} * ${triples}): ${doubles * triples}`);
  console.log(`Differing chars: ${diffChars()}`);
});

var diffChars = function() {
  for(var i =0; i<lines.length; i++) {
    var firstLine = lines[i];
    for(var j =0; j<lines.length; j++) {
      var secondLine = lines[j];
      var diff = compareLines(firstLine, secondLine);
      if (diff.length == 1) {
        return (firstLine.substring(0, diff[0]) + firstLine.substring(diff[0]+1, diff[0]+firstLine.length-diff[0]));
      }
    }
  }
};

var compareLines = function(first, second) {
  var chars = [];
  // assumes both are same length
  for(var i=0;i<first.length; i++) {
    if(first[i] != second[i]) {
      chars.push(i);
    }
  }
  return chars;
}
