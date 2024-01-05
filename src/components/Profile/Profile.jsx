import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useValidation from "../../hooks/useValidation";

export default function Profile({ isLoggedIn, logOut, onUpdateProfile }) {
  const { enteredValues, isError, isFormValid, handleChangeInput, resetForm } =
    useValidation();
  const currentUser = useContext(CurrentUserContext);
  const [lastDetails, setLastDetails] = useState(false);

  function onSubmitUserForm(e) {
    e.preventDefault();
    onUpdateProfile({
      name: enteredValues.name,
      email: enteredValues.email,
    });
  }

  useEffect(() => {
    if (
      currentUser.name === enteredValues.name &&
      currentUser.email === enteredValues.email
    ) {
      setLastDetails(true);
    } else {
      setLastDetails(false);
    }
  }, [currentUser.email, currentUser.name, enteredValues]);

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <section className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form" onSubmit={onSubmitUserForm} noValidate>
          <div className="profile__value">
            <label className="profile__label">Имя</label>
            <input
              type="name"
              name="name"
              className="profile__input"
              required
              minLength="2"
              maxLength="30"
              placeholder={currentUser.name}
              value={enteredValues.name || ""}
              onChange={handleChangeInput}
            />
            <span className="registration__error">{isError.name}</span>
          </div>
          <div className="profile__line"></div>
          <div className="profile__value">
            <label className="profile__label">E-mail</label>
            <input
              type="email"
              name="email"
              className="profile__input"
              required
              placeholder={currentUser.email}
              value={enteredValues.email || ""}
              onChange={handleChangeInput}
            />
            <span className="registration__error">{isError.email}</span>
          </div>
        </form>
        <div className="profile__footer">
          <button
            onClick={onSubmitUserForm}
            type="submit"
            className={
              isFormValid && !lastDetails
                ? "profile__edit"
                : "profile__edit_disabled"
            }
          >
            Редактировать
          </button>
          <button className="profile__logout" onClick={logOut}>
            Выйти из аккаунта
          </button>
        </div>
      </section>
    </>
  );
}
