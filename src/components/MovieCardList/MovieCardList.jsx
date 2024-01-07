import React, { useState, useEffect } from 'react';
import './MovieCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

import Preloader from '../Preloader/Preloader';

export default function MovieCardList({
  movies,
  isSavedMovies,
  savedMovies,
  handleLikeMovie,
  onRemoveMovie,
  preLoader,
}) {
  const [displayedMovies, setDisplayedMovies] = useState(0);
  const { pathname } = useLocation();

  function getMovieFromSaved(savedMovies, movie) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
  }

  function setDisplayedMoviesCount() {
    const display = window.innerWidth;
    if (display > 1240) {
      setDisplayedMovies(12);
    } else if (display > 707) {
      setDisplayedMovies(8);
    } else {
      setDisplayedMovies(4);
    }
  }

  function expandMoviesDisplay() {
    const display = window.innerWidth;
    if (display > 1240) {
      setDisplayedMovies(displayedMovies + 3);
    } else if (display > 707) {
      setDisplayedMovies(displayedMovies + 3);
    } else {
      setDisplayedMovies(displayedMovies + 3);
    }
  }

  useEffect(() => {
    let resizeTimeout;

    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setDisplayedMoviesCount();
      }, 100);
    }
    setDisplayedMoviesCount();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setDisplayedMoviesCount();
  }, [movies]);

  return (
    <section className='movie-cardlist'>
      {preLoader && <Preloader />}
      {!preLoader && (
        <>
          {pathname === '/saved-movies' ? (
            <ul className='movie__list'>
              {movies.map((movie) => {
                return (
                  <MoviesCard
                    key={isSavedMovies ? movie._id : movie.id}
                    saved={getMovieFromSaved(savedMovies, movie)}
                    movies={movies}
                    movie={movie}
                    handleLikeMovie={handleLikeMovie}
                    isSavedMovies={isSavedMovies}
                    onRemoveMovie={onRemoveMovie}
                    savedMovies={savedMovies}
                  />
                );
              })}
            </ul>
          ) : (
            <>
              <ul className='movie__list'>
                {movies.slice(0, displayedMovies).map((movie) => {
                  return (
                    <MoviesCard
                      key={isSavedMovies ? movie._id : movie.id}
                      saved={getMovieFromSaved(savedMovies, movie)}
                      movies={movies}
                      movie={movie}
                      handleLikeMovie={handleLikeMovie}
                      isSavedMovies={isSavedMovies}
                      onRemoveMovie={onRemoveMovie}
                      savedMovies={savedMovies}
                    />
                  );
                })}
              </ul>
              {movies.length > displayedMovies ? (
                <button
                  onClick={expandMoviesDisplay}
                  className={`movies__button${
                    pathname === '/saved-movies' ? '_hidden' : ''
                  }`}
                  type='button'
                >
                  Ещё
                </button>
              ) : (
                ''
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}
