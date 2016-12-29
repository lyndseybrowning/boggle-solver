import css from '../css/main.scss';
import solve from './solver';
import grid from './grid';
import 'whatwg-fetch';
import './analytics';

const env = process.env.NODE_ENV || 'development';
let path = '/dictionary';
if(env === 'production') {
  path = '/boggle-solver-js/dictionary';
}

let updateSize = document.getElementById('update-grid-size');
grid.init({ onLoad: true });
updateSize.addEventListener('click', () => { grid.init({ onLoad: true }) });

fetch(`${path}/sowpods.json`)
.then(response => { return response.json() })
.then(body => { solve(body) });
