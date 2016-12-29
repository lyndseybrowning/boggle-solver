import Dictionary from './dictionary';
import utils from './utils';

const directions = [ [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1] ];
const tiles = document.querySelectorAll('[data-letter]');
const err = document.getElementById('err');
const size = 4;
const minLength = 3;
const grid = [];
const validWords = [];

function handleReset() {
  [].forEach.call(tiles, (tile) => {
    tile.value = '';
  });
}

function handleSolve() {
  if(!allTilesEntered()) {
    err.innerText = (`Enter a letter in all fields`);
    return;
  }

  let counter = 0;
  [].reduce.call(tiles, (acc, tile, index) => {
    counter++;
    acc.push(tile.value);

    if(counter === size) {
      grid.push(acc);
      acc = [];
      counter = 0;
    }
    return acc;
  }, []);

  console.log(grid);

  grid.forEach((row, rowIndex) => {
   row.forEach((col, colIndex) => {
     solve(grid[rowIndex][colIndex], [rowIndex, colIndex]);
    });
  });

  console.log(validWords);
}

function allTilesEntered() {
  return [].every.call(tiles, (tile) => {
    return (tile.value != null && tile.value !== '');
  });
}

function solve(currentWord, currentPosition, usedPositions = []) {
	const [row, col] = currentPosition;
  const positionsCopy = usedPositions.slice();

  if(currentWord.length >= minLength && Dictionary.containsWord(currentWord) && !utils.inArray(validWords, currentWord)) {
    validWords.push(currentWord);
  }

  const adjacents = findAdjacents(currentPosition, usedPositions);

  adjacents.forEach(adjacent => {
  	positionsCopy.push(currentPosition);
    const [x,y] = adjacent;
    const letter = grid[x][y];
    const word = currentWord + letter;

    if(Dictionary.isValidPrefix(word)) {
      solve(word, adjacent, positionsCopy);
    }
  });
  return;
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

      if(!utils.arrayMatch(usedPositions, result)) {
   			acc.push(result);
      }
    }
    return acc;
  }, []);
}

export default (dictionary) => {
  Dictionary.init(dictionary);

  const solve = document.getElementById('solve');
  const reset = document.getElementById('reset');

  solve.addEventListener('click', handleSolve);
  reset.addEventListener('click', handleReset);
};
