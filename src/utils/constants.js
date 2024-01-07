export const backUrl = "https://max.students.nomoredomainsmonster.ru/api";
export const baseUrl = "https://api.nomoreparties.co/beatfilm-movies";

export const testUrl = "http://localhost:3000";
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}.`);
};

