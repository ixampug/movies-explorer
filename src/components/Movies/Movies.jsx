import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";
import Preloader from "../Preloader/Preloader";

import * as movies from "../../utils/MoviesApi";

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

export default function Movies({
  isLoggedIn,
  isLoading,
  handleLikeMovie,
  savedMovies,
  onRemoveMovie,
}) {
  const [shortMovies, setShortMovies] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [preLoader, setPreLoader] = useState(false);

  function handleShortMovieToggle() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      if (filterShortMovies(initialMovies).length === 0) {
        setFilteredMovies(filterShortMovies(initialMovies));
      } else {
        setFilteredMovies(filterShortMovies(initialMovies));
      }
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem("shortMovies", !shortMovies);
  }

  function updateFilteredMoviesList(movies, query, short) {
    const moviesCardList = filterMovies(movies, query, short);
    setInitialMovies(moviesCardList);
    setFilteredMovies(
      short ? filterShortMovies(moviesCardList) : moviesCardList
    );
    localStorage.setItem("movies", JSON.stringify(moviesCardList));
    localStorage.setItem("allMovies", JSON.stringify(movies));
  }

  function searchAndFilterMovies(query) {
    localStorage.setItem("movieSearch", query);
    localStorage.setItem("shortMovies", shortMovies);
    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"));
      updateFilteredMoviesList(movies, query, shortMovies);
    } else {
      setPreLoader(true);
      movies
        .getMovies()
        .then((moviesData) => {
          updateFilteredMoviesList(moviesData, query, shortMovies);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setPreLoader(false);
        });
    }
  }

  useEffect(() => {
    if (localStorage.getItem("shortMovies") === "true") {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      if (filteredMovies.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    }
  }, [filteredMovies, notFound]);

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      setInitialMovies(movies);
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  return (
    <section>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        searchAndFilterMovies={searchAndFilterMovies}
        shortMovies={shortMovies}
        onFilterMovies={handleShortMovieToggle}
        filteredMovies={filteredMovies}
        notFound={notFound}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MovieCardList
          movies={filteredMovies}
          isSavedMovies={false}
          savedMovies={savedMovies}
          handleLikeMovie={handleLikeMovie}
          onRemoveMovie={onRemoveMovie}
          notFound={notFound}
          preLoader={preLoader}
        />
      )}
      <Footer />
    </section>
  );
}
