export default {
  inArray(arr, item) {
    return (arr.indexOf(item) !== -1);
  },

  /// checks if two arrays are exactly the same
  // e.g. [1,1] === [1,1], [1,0] !== [1,1]
  arrayMatch(first, second) {
  	return first.some((item) => {
   		return item.every((x, index) => {
      	return x === second[index];
      });
    });
  },

  getTime() {
    return new Date().getTime();
  },

  allInputsFilled(inputs) {
     return [].every.call(inputs, (input) => {
         return (input.value != null && input.value !== '');
     });
   },

   getInputValues(inputs) {
     return [].reduce.call(inputs, (acc, input) => {
       if(input.value !== '') {
         return acc + input.value.toLowerCase();
       }
       return acc;
     }, '');
   },

   getBoardMatrix(boardSize, letters) {
     let matrix = [];
     let counter = 0;

     [].reduce.call(letters, (acc, letter, index) => {
       counter++;
       acc.push(letter);

       if(counter === boardSize) {
         matrix.push(acc);
         acc = [];
         counter = 0;
       }
       return acc;
     }, []);

     return matrix;
   }
};
