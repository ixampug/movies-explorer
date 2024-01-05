import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";

function filterShortMovies(movies) {
  return movies.filter((movie) => movie.duration <= 40);
}

function filterMovies(movies, query) {
  const moviesQuery = movies.filter((movie) => {
    const movieRU = String(movie.nameRU).toLowerCase().trim();
    const movieEN = String(movie.nameEN).toLowerCase().trim();
    const userQuery = query.toLowerCase().trim();
    return (
      movieRU.indexOf(userQuery) !== -1 || movieEN.indexOf(userQuery) !== -1
    );
  });
  return moviesQuery;
}

export default function SavedMovies({
  isLoggedIn,
  savedMovies,
  onRemoveMovie,
}) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [searchRequest, setSearchRequest] = useState("");
  const [shortMovies, setShortMovies] = useState(false);
  const [notFound, setNotFound] = useState(false);

  function searchAndFilterMovies(request) {
    setSearchRequest(request);
  }

  function handleShortMovieToggle() {
    setShortMovies(!shortMovies);
  }

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [filteredMovies]);

  useEffect(() => {
    const movieList = filterMovies(savedMovies, searchRequest);
    setFilteredMovies(shortMovies ? filterShortMovies(movieList) : movieList);
  }, [savedMovies, shortMovies, searchRequest]);

  return (
    <section>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        onFilterMovies={handleShortMovieToggle}
        searchAndFilterMovies={searchAndFilterMovies}
        filteredMovies={filteredMovies}
        notFound={notFound}
      />
      <MovieCardList
        movies={filteredMovies}
        isSavedMovies={true}
        savedMovies={savedMovies}
        onRemoveMovie={onRemoveMovie}
        notFound={notFound}
      />
      <Footer />
    </section>
  );
}
