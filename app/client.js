import request from 'superagent';
import qs from 'qs';

export default function client(method, url, { query = {}, body = {} }) {
  return new Promise((resolve, reject) => {
    request(method, url)
      .query(qs.stringify(query))
      .send(body)
      .end((err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      });
  });
}

export const get = (url, query = {}) =>
  client('GET', url, { query });

export const post = (url, body = {}) =>
  client('POST', url, { body });

export const put = (url, body = {}) =>
  client('PUT', url, { body });

export const del = (url, query = {}) =>
  client('DELETE', url, { query });
