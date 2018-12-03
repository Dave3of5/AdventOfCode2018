var total = 0;
var history = [];

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

lineReader.on('line', function (line) {
  total += parseInt(line);
  history.push(parseInt(line));
});

lineReader.on('close', function (line) {
  console.log('Total: ' + total);
  console.log('First Duplicate: ' + findDup());
});

var findDup = function() {
  var temp = 0;
  var tempHist = [];
  while(true) {
    for(var i =0; i < history.length; i++) {
      tempHist.push(temp);
      temp += history[i]
      if (tempHist.includes(temp)) {
        return temp;
      }
      
    }
  }
}
