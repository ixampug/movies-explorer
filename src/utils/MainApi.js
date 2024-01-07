import { backUrl } from "./constants";
import { checkResponse } from "./constants";
import { testUrl } from "./constants";

export const register = async (name, email, password) => {
  const res = await fetch(`${backUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  return checkResponse(res);
};

export const authorize = async (email, password) => {
  const res = await fetch(`${backUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return checkResponse(res);
};

export const getUsersContent = async (token) => {
  const res = await fetch(`${backUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(res);
};

export const getProfileInfo = async () => {
  const res = await fetch(`${backUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return checkResponse(res);
};

export const patchProfileInfo = async (data) => {
  const res = await fetch(`${backUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  });
  return checkResponse(res);
};

export const getSavedMovies = async () => {
  const res = await fetch(`${backUrl}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return checkResponse(res);
};

export const saveMovie = async (data) => {
  const res = await fetch(`${backUrl}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      year: data.year,
      description: data.description,
      duration: data.duration,

      image: `https://api.nomoreparties.co/${data.image.url}`,
      trailerLink: data.trailerLink,
      thumbnail: `https://api.nomoreparties.co/${data.image.formats.thumbnail.url}`,
      movieId: data.id,
      nameRU: data.nameRU || data.nameEN,
      nameEN: data.nameEN || data.nameRU,
    }),
  });
  return checkResponse(res);
};

export const removeMovie = async (movieId) => {
  const res = await fetch(`${backUrl}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return checkResponse(res);
};
