/**
 * Usage:
 *
 * createTypeMap({
 *   Tweets: ['*getAll', 'select']
 * })
 *
 * Returns:
 *
 * {
 *   Tweets: {
 *     getAll: { // Actually an array of the strings with these properties for middleware generic shit
 *       PENDING:   'TWEETS_GETALL_PENDING',
 *       FULFILLED: 'TWEETS_GETALL_FULFILLED',
 *       REJECTED:  'TWEETS_GETALL_REJECTED',
 *     },
 *     select: 'TWEETS_SELECT'
 *   }
 * }
 */
export default function createTypeMap(schema) {
  const all = {};

  for (let store of Object.keys(schema)) {
    all[store] = {};

    for (let action of schema[store]) {
      let ident = `${store}_${action}`.toUpperCase();

      if (action[0] === '*') {
        action = action.substring(1);
        ident  = ['pending', 'fulfilled', 'rejected'].map(type =>
                                                          `${store}_${action}_${type}`.toUpperCase());

        // So we can access them by name instead of index (for reducers)
        ident.PENDING   = ident[0];
        ident.FULFILLED = ident[1];
        ident.REJECTED  = ident[2];
      }

      if (all[store].hasOwnProperty(action)) {
        console.warn(`Duplicate action ${action} for ${store}! Previous entry has been overwritten.`)
      }

      all[store][action] = ident;
    }
  }

  return all;
}
