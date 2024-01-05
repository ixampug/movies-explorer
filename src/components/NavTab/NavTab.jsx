import React from "react";
import "./NavTab.css";

export default function NavTab() {
  return (
    <nav className="navtab">
      <a className="button button-text" href="#project">
        О проекте
      </a>
      <a className="button button-text" href="#techs">
        Технологии
      </a>
      <a className="button button-text" href="#student">
        Студент
      </a>
    </nav>
  );
}
