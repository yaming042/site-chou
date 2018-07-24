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
				<IndexRoute component={ Index.index } />
				<Route path='/enjoy' component={ Index.enjoy } />
				<Route path='/eat' component={ Index.eat } />
                <Route path='/stroll' component={ Index.stroll } />
                <Route path='/detail' component={ Index.subindex } />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);