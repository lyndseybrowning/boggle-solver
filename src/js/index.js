import 'whatwg-fetch';
import './analytics';
import css from '../css/main.scss';
import trie from './trie';
import board from './board';
import solver from './solver';

board.init();

fetch(`dictionary/sowpods.txt`)
.then(response => { return response.text() })
.then(response => {
  response.split('\n').forEach((word) => {
    trie.add(word);
  });
  solver.init();
});
