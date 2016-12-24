const Dictionary = () => {
  const trie={b:{a:{d:{$:1}},e:{a:{d:{$:1}},g:{$:1}}},f:{e:{d:{$:1},h:{$:1}}},h:{i:{e:{$:1,d:{$:1}}}}};

  return {
  	containsWord(word) {
    	if(typeof word !== 'string') {
      	throw(`Invalid parameter passed to Dictionary.containsWord(string word): ${word}`);
      }

    	if(word == null || !word) {
        return false;
      }

 			let currentNode = trie;
      return word.split('').every(letter => {
        if(!currentNode[letter]) {
        	return false;
        }
        currentNode = currentNode[letter];
      	return letter;
      });
    }
  }
};

module.exports = Dictionary();
