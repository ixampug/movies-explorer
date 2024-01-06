import React, { useState, useEffect } from "react";
import Main from "../Main/Main";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import NotFoundPage from "../NotFound/NotFound";
import "./App.css";
import Header from "../Header/Header";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as mainApi from "../../utils/MainApi";
import Footer from "../Footer/Footer";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [preLoader, setPreLoader] = useState(false);

  function handleRegistration({ name, email, password }) {
    mainApi
      .register(name, email, password)
      .then(() => {
        handleAuthorization({ email, password });
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAuthorization({ email, password }) {
    setPreLoader(true);
    mainApi
      .authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          navigate("/movies", { replace: true });
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPreLoader(false);
      });
  }

  function handlePatchProfile(newProfileInfo) {
    mainApi
      .patchProfileInfo(newProfileInfo)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
        handleAuthorizationError(err);
      });
  }

  function handleAuthorizationError(err) {
    if (err === "Error: 401") {
      handleLogOut();
    }
  }

  function handleLikeMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
        handleAuthorizationError(err);
      });
  }

  function handleRemoveMovie(movie) {
    mainApi
      .removeMovie(movie._id)
      .then(() => {
        setSavedMovies((state) =>
          state.filter((item) => item._id !== movie._id)
        );
      })
      .catch((err) => {
        console.log(err);
        handleAuthorizationError(err);
      });
  }

  const handleLogOut = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    localStorage.removeItem("jwt");
    localStorage.removeItem("allMovies");
    localStorage.removeItem("movieSearch");
    localStorage.removeItem("movies");
    localStorage.removeItem("shortMovies");
    navigate("/");
  };

  useEffect(() => {
    localStorage.removeItem("shortMovies");
    const jwt = localStorage.getItem("jwt");
    if (isLoggedIn && jwt) {
      Promise.all([mainApi.getProfileInfo(), mainApi.getSavedMovies()])
        .then(([user, movies]) => {
          setCurrentUser({ name: user.name, email: user.email });
          setSavedMovies(movies.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route
            path={"/"}
            element={
              <>
                <Header isLoggedIn={isLoggedIn} />
                <Main />
                <Footer />
              </>
            }
          />
          <Route path={"*"} element={<NotFoundPage />} />
          <Route
            path={"/sign-up"}
            element={
              isLoggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
                <Register
                  preLoader={preLoader}
                  onRegister={handleRegistration}
                />
              )
            }
          />
          <Route
            path={"/sign-in"}
            element={
              isLoggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
                <Login
                  preLoader={preLoader}
                  onAuthorization={handleAuthorization}
                />
              )
            }
          />
          <Route
            path={"/movies"}
            element={
              <ProtectedRoute
                path="/movies"
                isLoggedIn={isLoggedIn}
                element={Movies}
                handleLikeMovie={handleLikeMovie}
                onRemoveMovie={handleRemoveMovie}
                savedMovies={savedMovies}
              />
            }
          />
          <Route
            path={"/saved-movies"}
            element={
              <ProtectedRoute
                path="/saved-movies"
                isLoggedIn={isLoggedIn}
                element={SavedMovies}
                handleLikeMovie={handleLikeMovie}
                onRemoveMovie={handleRemoveMovie}
                savedMovies={savedMovies}
              />
            }
          />
          <Route
            path={"/profile"}
            element={
              <ProtectedRoute
                path="/profile"
                isLoggedIn={isLoggedIn}
                element={Profile}
                logOut={handleLogOut}
                onUpdateProfile={handlePatchProfile}
              />
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}
