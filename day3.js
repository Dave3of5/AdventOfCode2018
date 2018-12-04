// var square = {
//   id: '123',
//   topLeft: {x: 0, y: 10},
//   bottomRight: {x: 10, y: 0}
// };

var squares = [];
const canvasSize = 1000;

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input3.txt')
});

lineReader.on('line', function (line) {
  squares.push(parseSquare(line));
});

lineReader.on('close', function (line) {
  var count = 0
  var singleHits = {};

  for (var x = 0; x < canvasSize; x++) {
    for (var y = 0; y < canvasSize; y++) {
      if(checkOverlap(x,y).count > 1) {
        count += 1;
      } else if(checkOverlap(x,y).count === 1) {
        if (!singleHits[checkOverlap(x,y).ids[0]]) {
          singleHits[checkOverlap(x,y).ids[0]] = 1
        } else {
          singleHits[checkOverlap(x,y).ids[0]] += 1;  
        }
      }
    }
  }
  for (var i = 0; i < squares.length; i++) {
    if(singleHits[squares[i].id]) {
      if(singleHits[squares[i].id] == squares[i].area) {
        console.log(`islands: ${squares[i].id}`);
      }
    }
  }
  console.log(`Total: ${count}`);
});

var checkOverlap = function (x, y) {
  var count = 0;
  var claimIds = [];
  for (var i = 0; i < squares.length; i++) {
    if((x >= squares[i].topLeft.x) && (y >= squares[i].topLeft.y) &&
       (x < squares[i].bottomRight.x) && (y < squares[i].bottomRight.y)) {
      count++;
      claimIds.push(squares[i].id);
    }
  }
  return {count: count, ids: claimIds};
}

var parseSquare = function (line) {
  var hashLoc = line.indexOf("#");
  var atLoc = line.indexOf("@");
  var commaLoc = line.indexOf(",");
  var colonLoc = line.indexOf(":");
  var timesLoc = line.indexOf("x");

  var id = line.substring(hashLoc+1, atLoc-1);
  var tlx = parseInt(line.substring(atLoc+2, commaLoc));
  var tly = parseInt(line.substring(commaLoc+1, colonLoc));
  var width = parseInt(line.substring(colonLoc+2, timesLoc));
  var height = parseInt(line.substring(timesLoc+1, line.length))
  var brx = tlx + width;
  var bry = tly + height;
  var area = width*height;

  var square = {
    id: id,
    topLeft: {x: tlx, y: tly},
    bottomRight: {x: brx, y: bry},
    area: area
  };

  return square;
}
