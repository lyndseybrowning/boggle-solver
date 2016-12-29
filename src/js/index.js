import css from '../css/main.scss';
import solve from './solver.js';
import 'whatwg-fetch';

const env = process.env.NODE_ENV || 'production';
let path = '/dictionary';
if(env === 'production') {
  path = '/boggle-solver-js/dictionary';
}

fetch(`${path}/sowpods.json`)
.then(response => { return response.json() })
.then(body => { solve(body) });
