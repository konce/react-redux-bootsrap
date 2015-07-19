import React from 'react';

//    @prepareRoute(async function ({ store, params, location }) {
//      return await * [
//        store.dispatch(ActionCreators.getAll())
//      ];
//    })
export default function prepareRoute(prepareFn) {
  return DecoratedComponent =>
    class PrepareRouteDecorator {
      static get prepareRoute() {
        return prepareFn;
      }

      static get contextTypes() {
        return {
          store: React.PropTypes.object.isRequired
        };
      }

      render() {
        return (
          <DecoratedComponent {...this.props} />
        );
      }

      componentDidMount() {
        const {
          context: { store },
          props: { params, location }
        } = this;

        prepareFn({ store, params, location });
      }
    };
}
