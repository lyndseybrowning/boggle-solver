import settings from './settings';
import utils from './utils';
import board from './board';
import trie from './trie';

// DOM elements
const solve = document.getElementById('solve');
const reset = document.getElementById('reset');
const err = document.getElementById('err');
const numWords = document.getElementById('num-words');
const wordList = document.getElementById('word-list');
const execution = document.getElementById('execution');
const executionTime = document.getElementById('execution-time');

// settings
const minLength = settings.minWordLength;
const directions = [ [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1] ];

execution.style.visibility = 'hidden';
let boardMatrix = [];
let wordsFound = [];
let boardSize = board.getSize();

export default (() => {
  return {
    init
  }
})();

function init() {
  // event handlers
  solve.addEventListener('click', onSolveClick);
  reset.addEventListener('click', onResetClick);
}

function onSolveClick(e) {
  const executionStartTime = utils.getTime();
  const letters = utils.getInputValues(document.querySelectorAll('[data-letter]'));
  wordsFound = [];
  boardSize = board.getSize();
  boardMatrix = utils.getBoardMatrix(boardSize, letters);

  if(letters.length < boardSize * boardSize) {
    err.innerText = (`Please enter a letter in ALL fields.`);
    return;
  }

  // run solver
  boardMatrix.forEach((row, rowIndex) => {
   row.forEach((col, colIndex) => {
     solveBoard(boardMatrix[rowIndex][colIndex], [rowIndex, colIndex]);
   });
  });

  const executionEndTime = utils.getTime();
  execution.style.visibility = 'visible';
  executionTime.innerText = `${executionEndTime-executionStartTime}ms`;

  if(wordsFound.length) {
    displayResults(wordsFound);
  }
}

function onResetClick(e) {
  board.init();
}

function solveBoard(currentWord, currentPosition, usedPositions = []) {
  	const [row, col] = currentPosition;
    const positionsCopy = usedPositions.slice();

    if(currentWord.length >= minLength && trie.containsWord(currentWord) && !utils.inArray(wordsFound, currentWord)) {
      wordsFound.push(currentWord);
    }

    const adjacents = getAdjacentLetters(currentWord, currentPosition, usedPositions);

    adjacents.forEach(adjacent => {
    	positionsCopy.push(currentPosition);
      const [x,y] = adjacent;
      const letter = boardMatrix[x][y];
      const word = currentWord + letter;

      solveBoard(word, adjacent, positionsCopy);
    });
    return;
}

function getAdjacentLetters(currentWord, position, usedPositions) {
  const _directions = directions.slice(0);
  const [row,col] = position;

	return _directions.reduce((acc, direction) => {
  	const [x, y] = direction;
    const rowSum = (x < 0) ? row - Math.abs(x) : row + x;
    const colSum = (y < 0) ? col - Math.abs(y) : col + y;

    if((rowSum >= 0 && colSum >= 0) && (rowSum < boardSize && colSum < boardSize)) {
    	let adjacent = [rowSum, colSum];
      let adjacentWord = currentWord + boardMatrix[rowSum][colSum];

      if(!utils.arrayMatch(usedPositions, adjacent) && trie.isValidPrefix(adjacentWord)) {
   			acc.push(adjacent);
      }
    }
    return acc;
  }, []);
}

function displayResults(results) {
  results = results.sort((a, b) => { return b.length - a.length; });
  numWords.innerText = results.length;
  wordList.innerHTML = results.reduce((acc, word) => {
    return acc + `<li class="c-wordlist__word o-grid__col u-1/4">${word}</li>`;
  }, '');
}
