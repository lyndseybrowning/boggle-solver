




const Dictionary = require('./dictionary');

const validWords = [];
const directions = [ [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1] ];
const grid = [
    ['s', 'e', 'r', 's'],
    ['p', 'a', 't', 'g'],
    ['l', 't', 'n', 'i'],
    ['a', 'a', 'a', 'a']
];
const size = grid.length;
const minLength = 3;

grid.forEach((row, rowIndex) => {
 row.forEach((col, colIndex) => {
    solve(grid[rowIndex][colIndex], [rowIndex, colIndex]);
  });
});
console.log(validWords);


function solve(currentWord, currentPosition, usedPositions = []) {
	const [row, col] = currentPosition;
  const positionsCopy = usedPositions.slice();

  if(currentWord.length >= minLength && Dictionary.containsWord(currentWord) && !inArray(validWords, currentWord)) {
    validWords.push(currentWord);
  }
  const adjacents = findAdjacents(currentPosition, usedPositions);

  adjacents.forEach(adjacent => {
  	positionsCopy.push(currentPosition);
    const [x,y] = adjacent;
    const letter = grid[x][y];
    const word = currentWord + letter;

    solve(word, adjacent, positionsCopy);
  });

  return;
}

function inArray(arr, word) {
	return (arr.indexOf(word) !== -1);
}

/// checks if two arrays are exactly the same
// e.g. [1,1] === [1,1], [1,0] !== [1,1]
function arrayMatch(first, second) {
	return first.some((item) => {
 		return item.every((x, index) => {
    	return x === second[index];
    });
  });
}

// loop directions to find adjacent positions
// disregard positions that have already been used in usedPositions
function findAdjacents(position, usedPositions) {
	const allDirections = directions.slice(0);
	const [row,col] = position;

	return allDirections.reduce((acc, direction) => {
  	const [x, y] = direction;
    const rowSum = (x < 0) ? row - Math.abs(x) : row + x;
    const colSum = (y < 0) ? col - Math.abs(y) : col + y;

    if((rowSum >= 0 && colSum >= 0) && (rowSum < size && colSum < size)) {
    	let result = [rowSum, colSum];

      if(!arrayMatch(usedPositions, result)) {
   			acc.push(result);
      }
    }
    return acc;
  }, []);
}
