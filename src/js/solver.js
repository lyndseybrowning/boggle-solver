import Dictionary from './dictionary';
import grid from './grid';
import utils from './utils';
import settings from './settings';

const directions = [ [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1] ];
const err = document.getElementById('err');
const minLength = settings.minWordLength;
const numWords = document.getElementById('num-words');
const wordList = document.getElementById('word-list');
const execution = document.getElementById('execution');
const executionTime = document.getElementById('execution-time');

execution.style.visibility = 'hidden';

let board = [];
let validWords = [];
let tiles = null;
let size = grid.size;

function handleReset() {
  [].forEach.call(tiles, (tile) => {
    tile.value = '';
  });

  numWords.innerText = 0;
  wordList.innerHTML = '';
  grid.init({ onLoad: true });
}

function handleSolve() {
  let start = new Date().getTime();
  let counter = 0;
  tiles = document.querySelectorAll('[data-letter]');
  size = grid.size;


  if(!allTilesEntered()) {
    err.innerText = (`Enter a letter in all fields`);
    return;
  }

  board = [];
  validWords = [];

  [].reduce.call(tiles, (acc, tile, index) => {
    counter++;
    acc.push(tile.value.toLowerCase());

    if(counter === size) {
      board.push(acc);
      acc = [];
      counter = 0;
    }
    return acc;
  }, []);

  board.forEach((row, rowIndex) => {
   row.forEach((col, colIndex) => {
     solve(board[rowIndex][colIndex], [rowIndex, colIndex]);
    });
  });
  let end = new Date().getTime();

  execution.style.visibility = 'visible';
  executionTime.innerText = `${end-start}ms`;

  if(validWords.length) {
    handleResults(validWords);
  }
}

function handleResults(results) {
  results = results.sort((a, b) => { return b.length - a.length; });
  numWords.innerText = results.length;

  wordList.innerHTML = results.reduce((acc, word) => {
    return acc + `<li>${word}</li>`;
  }, '');
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
    const letter = board[x][y];
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
