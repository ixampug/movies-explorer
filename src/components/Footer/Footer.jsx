import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </span>
      <div className="footer__info">
        <p className="footer__copyright">&copy; 2023</p>
        <div className="footer__links">
          <a
            className="footer__link"
            href="https://practicum.yandex.ru/"
            target="_blank"
            rel="noreferrer"
          >
            Яндекс.Практикум
          </a>
          <a
            className="footer__link"
            href="https://github.com/ixampug"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
