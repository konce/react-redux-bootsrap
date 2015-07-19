import React from 'react';
import { Router, Route } from 'react-router';
import Application from './Application';

const routes = (
  <Route component={Application}>
    <Route path="/" component={Placeholder}/>
  </Route>
);

class Placeholder {
  render() {
    return;
  }
}

export default class AppRouter {
  static get propTypes() {
    return {
      history: React.PropTypes.object.isRequired
    };
  }

  render() {
    return (
      <Router {...this.props}>
        {routes}
      </Router>
    );
  }
}
