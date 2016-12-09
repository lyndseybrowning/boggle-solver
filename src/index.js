const minWordLength = 3;
const boardSize = 3;
const wordList = [];
const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
];
const tiles = [
    ['a', 'b', 'c'],
    ['d', 'e', 'f'],
    ['g', 'h', 'i']
];

//tiles.forEach((row, x) => {
//	row.forEach((letter, y) => solve(letter, [x,y]));
//});

solve('a', [0, 0]);

function solve(currentWord, currentPosition, usedPositions = []) {

    if (currentWord.length >= minWordLength && Dictionary.containsWord(currentWord) && !wordList.contains(currentWord)) {
        wordList.push(currentWord);
    }

    if (usedPositions.length === (boardSize * 2) - 1) {
        return wordList;
    }

    const adjacents = findAdjacents(currentPosition, [
        [0, 1]
    ]);

    // check if there are any valid positions to go to that haven't been used
    // if there aren't we return early

    // check if the length of the word exceeds minWordLength
    // otherwise move to next position

    // check if the current word exists in the dictionary
    // if it does, add it to the word list
}

// find a list of positions adjacent to the position passed in
// e.g. [0,0] returns [ [0,1], [1,0], [1,1] ]
// filter out usedPositions
function findAdjacents(currentPosition, usedPositions) {
    const[rowPosition, colPosition] = currentPosition;

    return directions.reduce((acc, direction) => {
        const [row,col] = direction;      

        // if the calculated direction is in usedPositions, ignore




        const invalid = direction.some((position) => {
            if (position < 0) {
                let pos = Math.abs(position);
                return (row - pos) < 0 || (col - pos) < 0;
            }
            return (row + position) > boardSize || (col + position) > boardSize;
        });

        if (!invalid) {
            acc.push(direction);
        }

        return acc;

    }, []);
}
