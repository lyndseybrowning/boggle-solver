const Dictionary = () => {
  let trie = {};

  return {
    init(dictionary) {
      trie = dictionary;
    },
  	containsWord(word) {
    	if(typeof word !== 'string') {
      	throw(`Invalid parameter passed to Dictionary.containsWord(string word): ${word}`);
      }

    	if(word == null || !word) {
        return false;
      }

      let currentNode = trie;
      return word.split('').every((letter, index) => {
        if(!currentNode[letter]) {
        	return false;
        }
        currentNode = currentNode[letter];

        if(index === word.length - 1) {
          return currentNode.$ === 1;
        }
      	return letter;
      });
    },
    isValidPrefix(prefix) {
      let currentNode = trie;

      return prefix.split('').every(letter => {
        if(!currentNode[letter]) {
        	return false;
        }
        currentNode = currentNode[letter];
        return true;
      });
    }
  }
};

module.exports = Dictionary();
