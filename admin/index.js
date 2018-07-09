import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import {Router, Route, hashHistory, IndexRoute, browserHistory} from 'react-router';

import store from './store';

import Base from './base';
import Enjoy from './components/enjoy';
import Eat from './components/eat';
import Stroll from './components/stroll';

ReactDom.render(
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route component={ Base }>
                <Route path='/admin/enjoy' component={ Enjoy }/>
                <Route path='/admin/eat' component={ Eat }/>
                <Route path='/admin/stroll' component={ Stroll }/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);