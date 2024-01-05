import { baseUrl } from './constants';
import { checkResponse } from './constants';

export function getMovies() {
  return fetch(baseUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => checkResponse(res));
}
