import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import History from 'react-router/lib/HashHistory';
import request from 'superagent';
import qs from 'qs';
import Router from './components/Router';
import createStore from './lib/createStore';
import createAPI from './lib/createAPI';

const api = createAPI(({ method, pathname, query = {}, body = {} }) => {
  const url = pathname,
        headers = {
          'Content-Type': 'application/json'
        };

  return request(method, url)
    .query(qs.stringify(query))
    .set(headers)
    .send(body);
});

const history = new History;
const store = createStore(api);

React.render((
  <Provider {...{ store }}>
    {() => <Router {...{ history }} />}
  </Provider>
), document.body);
