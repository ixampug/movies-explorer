import React from "react";
import Promo from "../Promo/Promo";
// import NavTab from "../NavTab/NavTab";
import AboutMe from "../AboutMe/AboutMe";
import Techs from "../Techs/Techs";
import AboutProject from "../AboutProject/AboutProject";
import Portfolio from "../Portfolio/Portfolio";

export default function Main() {
  return (
    <>
      <main className="main">
        <Promo />
        {/* <NavTab /> */}
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
    </>
  );
}
