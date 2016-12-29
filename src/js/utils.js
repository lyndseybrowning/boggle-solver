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
  }  
};
