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
				<IndexRoute component={ Index.index1 } />
				<Route path='/type1' component={ Index.index2 } />
				<Route path='/type2' component={ Index.index3 } />
				<Route path='/type3' component={ Index.index4 } />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);