import React from "react";
import "./AboutMe.css";
import student__photo from "../../images/student__photo.jpg";

export default function AboutMe() {
  return (
    <section className="student" id="student">
      <h2 className="student__title">Студент</h2>
      <div className="student__content">
        <div className="student__info">
          <span className="student__name">Максим</span>
          <span className="student__job">Фронтенд-разработчик, 28 лет</span>
          <span className="student__bio">
            Я родился в Чебоксарах, живу в Санкт-Петербурге. Закончил факультет
            конфликтологии, сейчас прохожу курс по веб-разработке. Работал в
            службе поддержки медиасервисов Яндекса.
          </span>
          <a
            className="student__link"
            href="https://github.com/ixampug"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
        <img
          className="student__photo"
          src={student__photo}
          alt="фото студента"
        />
      </div>
    </section>
  );
}
