import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import store from './store';

import Base from './indexBase';
import * as Index from './containers';

ReactDom.render(
	<Provider store={store}>
		<Router history={ browserHistory }>
			<Route path='/' component={ Base } >
				<IndexRoute component={ Index.index1 }>逛</IndexRoute>
				<Route path='/guang' component={ Index.index1 }>逛</Route>
				<Route path='/chi' component={ Index.index2 }>吃</Route>
				<Route path='/mai' component={ Index.index3 }>买</Route>
				<Route path='/wan' component={ Index.index4 }>玩</Route>
				<Route path='/other' component={ Index.index5 }>其他</Route>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);