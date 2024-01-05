import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import Switch from "../Switch/Switch";
import { useLocation } from "react-router-dom";

export default function SearchForm({
  shortMovies,
  searchAndFilterMovies,
  onFilterMovies,
  notFound,
}) {
  const location = useLocation();
  const [searchRequest, setSearchRequest] = useState("");
  const [searchError, setSearchError] = useState(false);

  function onSubmitForm(e) {
    e.preventDefault();
    if (searchRequest.trim().length === 0) {
      setSearchError(true);
    } else {
      setSearchError(false);
      searchAndFilterMovies(searchRequest);
    }
  }

  function handleChangeInput(e) {
    setSearchRequest(e.target.value);
  }

  useEffect(() => {
    if (
      localStorage.getItem("movieSearch") &&
      location.pathname === "/movies"
    ) {
      const localSearchRequest = localStorage.getItem("movieSearch");
      setSearchRequest(localSearchRequest);
    }
  }, [location]);

  return (
    <section className="search">
      <form
        className="search__form"
        name="search-saved-movie-form"
        onSubmit={onSubmitForm}
        noValidate
      >
        <input
          className="search__input"
          type="text"
          placeholder="Фильм"
          required
          name="searchRequest"
          value={searchRequest || ""}
          onChange={handleChangeInput}
        />
        <button className="search__button" type="submit" />
      </form>
      {searchError ? (
        <span className="search__error">введите слово</span>
      ) : notFound ? (
        <span className="search__error">ничего не найдено</span>
      ) : (
        ""
      )}
      <Switch shortMovies={shortMovies} onFilterMovies={onFilterMovies} />
      <div className="search__underline" />
    </section>
  );
}
