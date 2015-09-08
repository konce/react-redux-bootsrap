import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import History from 'react-router/lib/HashHistory';
import Router from './chrome/Router';
import store from './store';

const history = new History;
const appEl = document.getElementById('wrapper');

React.render((
  <Provider store={store}>
    {() => <Router history={history} />}
  </Provider>
), appEl);
