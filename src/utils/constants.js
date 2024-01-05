
export const backUrl = 'https://max.students.nomoredomainsmonster.ru/api';
export const baseUrl = 'https://api.nomoreparties.co/beatfilm-movies';

export const PC_SCREEN = 12;
export const TABLET_SCREEN = 8;
export const MOBILE_SCREEN = 5;
export const NEXT_PC_SCREEN_MOVIES = 3;
export const NEXT_TABLET_SCREEN_MOVIES = 2;
export const NEXT_MOBILE_SCREEN_MOVIES = 2;

export const ERR_BAD_REQ = 400;
export const ERR_UNAUTHORIZED = 401;
export const ERR_FORBIDDEN = 403;
export const ERR_NOT_FOUND = 404;
export const ERR_CONFLICT = 409;
export const SERVER_ERR = 500;
export const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}.`);
  };
export const PC_DISPLAY = 1240;
export const TABLET_DISPLAY = 707;
