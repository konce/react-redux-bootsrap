import Promise from 'bluebird';
import qs from 'qs';
import URL from 'url';

function isObject(obj) {
  return typeof obj === 'object' && !!obj;
}
function assign(obj, ...rest) {
  rest.forEach(other => {
    for (let key of Object.keys(other)) {
      obj[key] = other[key];
    }
  });
}

export default function createAPI(createRequest) {
  return async function api(path, method = 'GET', params = {}) {
    let { pathname, query: queryStr } = URL.parse(path),
        query = qs.parse(queryStr),
        body;

    if (isObject(method)) {
      params = method;
      method = 'GET';
    }

    if (method === 'GET') {
      if (isObject(params)) {
        assign(query, params);
      }
    } else {
      body = params;
    }

    return await new Promise((resolve, reject) => {
      createRequest({ method, pathname, query, body })
        .end((err, res) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(res);
          }
        });
    });
  };
}
