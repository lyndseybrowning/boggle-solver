import settings from './settings';

export default (() => {
  const defaultGrid = settings.defaultSize;
  const board = document.getElementById('board');
  const numWords = document.getElementById('num-words');
  const wordList = document.getElementById('word-list');

  return {
    size: defaultGrid,
    init(options) {
      const setRows = document.getElementById('num-rows');
      const setCols = document.getElementById('num-cols');
      const numRows = setRows.value !== '' ? setRows.value : defaultGrid;
      const numCols = setCols.value !== '' ? setCols.value : defaultGrid;

      function handleSizeChange() {
        setRows.value = this.value;
      }

      setCols.addEventListener('input', handleSizeChange);
      setRows.value = numRows;
      setCols.value = numCols;
      this.size = parseInt(numRows, 10);

      let rows = 0;
      let strBoard = '';
      let defaultLetters = [];
      let hasDefaultLetters = false;

      if(options.onLoad) {
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
      board.innerHTML = strBoard;
      numWords.innerText = 0;
      wordList.innerHTML = '';
    }
  };
})();
