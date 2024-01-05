import React from "react";
import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <ul className="portfolio__projects">
        <li>
          <a
            className="portfolio__link"
            href="https://github.com/ixampug/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
            <span className="arrow" />
          </a>
        </li>
        <li>
          <a
            className="portfolio__link"
            href="https://github.com/ixampug/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
            <span className="arrow" />
          </a>
        </li>
        <li>
          <a
            className="portfolio__link"
            href="https://github.com/ixampug/react-mesto-api-full-gha"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
            <span className="arrow" />
          </a>
        </li>
      </ul>
    </section>
  );
}
