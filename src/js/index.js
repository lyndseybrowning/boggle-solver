import css from '../css/main.scss';
import solve from './solver.js';
import 'whatwg-fetch';

fetch('/dictionary/sowpods.json')
.then(response => { return response.json() })
.then(body => { solve(body) });
