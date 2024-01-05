import React, { useState } from "react";
import logo from "../../images/logo.svg";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

export default function Header({ isLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuHandler = () => setIsMenuOpen(!isMenuOpen);

  const setActiveLink = ({ isActive }) =>
    isActive ? "header__link_active" : "header__link";

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="лого" />
        </Link>
        {isLoggedIn ? (
          <div className="header__links">
            <NavLink className={setActiveLink} to="/movies">
              Фильмы
            </NavLink>
            <NavLink className={setActiveLink} to="/saved-movies">
              Сохраненные фильмы
            </NavLink>
          </div>
        ) : (
          ""
        )}
        {isLoggedIn ? (
          <Link className="header__info" to="/profile">
            <button className="header__button-account" type="button">
              Аккаунт
            </button>
          </Link>
        ) : (
          <>
            <div className="header__links">
              <Link className="header__link header__link_reg" to="/sign-up">
                Регистрация
              </Link>
              <Link className="header__link header__link_log" to="/sign-in">
                <button className="header__button">Войти</button>
              </Link>
            </div>
          </>
        )}
        {isLoggedIn && (
          <button
            className="header__button-menu"
            onClick={menuHandler}
          ></button>
        )}
      </div>

      <Navigation isOpen={isMenuOpen} onClose={menuHandler} />
    </header>
  );
}
