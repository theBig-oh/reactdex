import React ,{ Component }from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import App from './components/App';
import Home from './components/Home/Home';
import Pokefacts from './components/Pokefacts/Pokefacts';


import './index.scss';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'; 

ReactDOM.render(
  (<Router history={browserHistory}>
  		<Route component = {App}>
  			<Route path='/' component = {Home} />
  			<Route path='/pkmn/:pkmnId' component = {Pokefacts} />
  	

  		</Route>
  		
  		


  </Router>),
  document.getElementById('root')
);
