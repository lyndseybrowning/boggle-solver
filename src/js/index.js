import css from '../css/main.scss';
import solve from './solver.js';
import 'whatwg-fetch';

let path = '/dictionary';
if(typeof process.env.NODE_ENV === 'production') {
  path = 'lyndseyb.co.uk/boggle-solver-js';
}

fetch(`${path}/sowpods.json`)
.then(response => { return response.json() })
.then(body => { solve(body) });
