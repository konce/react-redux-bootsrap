import React from 'react';
import { Link } from 'react-router';

export default class Application {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  render() {
    const { props : { children } } = this;

    return (
      <div id="app">
        <nav>
          <div className="nav-wrapper">
            <ul className="left">
              <li {...this.toggleSelected('/')}><Link to="/">Home</Link></li>
            </ul>
          </div>
        </nav>

        <div className="container">
          {children}
        </div>
      </div>
    );
  }

  toggleSelected(path) {
    if (this.context.router.state.location.pathname === path) {
      return { className: 'active' };
    } else {
      return {};
    }
  }
}
