import settings from './settings';
import utils from './utils';
import board from './board';
import trie from './trie';

// DOM elements
const solve = document.getElementById('solve');
const reset = document.getElementById('reset');
const err = document.getElementById('err');
const numWords = document.getElementById('num-words');
const elWordList = document.getElementById('word-list');
const execution = document.getElementById('execution');
const executionTime = document.getElementById('execution-time');

// settings
const minLength = settings.minWordLength;
const directions = [ [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1] ];

execution.style.visibility = 'hidden';
let boardMatrix = [];
let wordListObj = [];
let coords = [];
let wordList = [];
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
  const userMessage = document.getElementById('userMessage');

  wordListObj = [];
  wordList = [];
  boardSize = board.getSize();
  boardMatrix = utils.getBoardMatrix(boardSize, letters);
  userMessage.setAttribute('hidden', true);

  if(letters.length < boardSize * boardSize) {
    userMessage.removeAttribute('hidden');
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

  if(wordList.length) {
    displayResults(wordListObj);
  }
}

function onResetClick(e) {
  board.init({ loadDefaults: false });
}

function solveBoard(currentWord, currentPosition, coords = [], usedPositions = []) {
  	const [row, col] = currentPosition;
    const positions_copy = usedPositions.slice();
    const coords_copy = coords.slice();

    coords_copy.push(currentPosition);

    if(currentWord.length >= minLength && trie.containsWord(currentWord) && !utils.inArray(wordList, currentWord)) {
      wordList.push(currentWord);
      wordListObj.push({
          word: currentWord,
          coords: coords_copy
      });
      coords = [];
    }

    const adjacents = getAdjacentLetters(currentWord, currentPosition, usedPositions);

    adjacents.forEach(adjacent => {
    	positions_copy.push(currentPosition);
      const [x,y] = adjacent;
      const letter = boardMatrix[x][y];
      const word = currentWord + letter;

      solveBoard(word, adjacent, coords_copy, positions_copy);
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

function displayResults(wordListObj) {
  // sort available words by length descending
  wordListObj = wordListObj.sort((a, b) => { return b.word.length - a.word.length; });

  numWords.innerText = wordList.length;
  elWordList.innerHTML = wordListObj.reduce((acc, obj) => {
    return acc + `<li class="c-wordlist__word o-grid__col u-1/4" data-coords="${JSON.stringify(obj.coords)}">${obj.word}</li>`;
  }, '');

  const tiles = document.querySelectorAll('.c-boggle__tile');

  elWordList.addEventListener('click', (e) => {
    [].forEach.call(tiles, tile => {
      tile.classList.remove('c-boggle__tile--selected');
    });
    const word = e.target;
    if(!word.nodeName === 'LI' && !word.getAttribute('data-coords')) {
      return;
    }

    const coords = JSON.parse(word.getAttribute('data-coords'));
    coords.forEach((coord, index) => {
      const [row, col] = coord;
      setTimeout(() => {
        tiles[boardSize * row + col].classList.add('c-boggle__tile--selected');
      }, index * 200);
    });
  });
}
