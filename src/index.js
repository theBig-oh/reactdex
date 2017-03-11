import React ,{ Component }from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import App from './components/App';
import Home from './components/Home/Home';

import './index.scss';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'; 

ReactDOM.render(
  (<Router history={browserHistory}>
  		<Route path = "/" component={App}>
  			<IndexRoute component = {Home} />

  		</Route>

  </Router>),
  document.getElementById('root')
);
