import settings from './settings';

export default (() => {
  const board = document.getElementById('board');
  const numWords = document.getElementById('num-words');
  const wordList = document.getElementById('word-list');
  let boardSize = settings.defaultSize;

  function init(options = {
      loadDefaults: true
    }) {
      
    const setRows = document.getElementById('num-rows');
    const setCols = document.getElementById('num-cols');
    const numRows = setRows.value !== '' ? parseInt(setRows.value, 10) : boardSize;
    const numCols = setCols.value !== '' ? parseInt(setCols.value,10) : boardSize;

    // update size
    if(numRows !== boardSize) {
      boardSize = numRows;
    }

    // update size values
    setRows.value = numRows;
    setCols.value = numCols;

    let rows = 0;
    let strBoard = '';
    let defaultLetters = [];
    let hasDefaultLetters = false;

    if(options.loadDefaults) {
      if(settings.defaultBoards.hasOwnProperty(numRows)) {
        hasDefaultLetters = true;
        defaultLetters = settings.defaultBoards[numRows].split(' ');
      }
    }

    while(rows < numRows) {
      let cols = 0;
      while(cols < numCols) {
        strBoard += `<div class="o-grid__col u-1/${numRows}"><input type="text" maxlength="1" data-letter class="c-boggle__tile" value="${hasDefaultLetters ? defaultLetters[rows][cols] : ''}"></div>`;
        cols++;
      }
      rows++;
    }

    // generate board
    board.innerHTML = strBoard;
    numWords.innerText = 0;
    wordList.innerHTML = '';

    // events
    // change rows and cols together
    setCols.addEventListener('input', (e) => { setRows.value = e.target.value; });
    updateBoard();
  }

  function getSize() {
    return boardSize;
  }

  function updateBoard() {
    const boardUpdate = document.getElementById('update-grid-size');
    boardUpdate.addEventListener('click', (e) => {
      e.stopPropagation();
      e.stopImmediatePropagation();
      init();
    });
  }

  return {
    getSize,
    init
  };
})();
