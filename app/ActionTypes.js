function mapActions(stores) {
  const all = {};

  for (let store of Object.keys(stores)) {
    all[store] = {};

    for (let action of stores[store]) {
      let ident = `${store}_${action}`;

      if (action[0] === '*') {
        action = action.substring(1);
        ident = {
          begin: `${store}_${action}_begin`,
          end:   `${store}_${action}_end`
        };
      }

      if (all[store].hasOwnProperty(action)) {
        console.warn(`Duplicate action ${action} for ${store}! Previous one has been overwritten.`)
      }
      all[store][action] = ident;
    }
  }

  return all;
}

export default mapActions({
});
