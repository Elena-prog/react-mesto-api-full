import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import headerLogo from "../images/logo.svg";

export default function Header({ loggedIn, currentEmail, signOut }) {
  const history = useHistory();

  function handleClick(path) {
    if (loggedIn) {
      signOut();
    }
    history.push(path);
  }

  return (
    <header className="header">
      <img
        src={headerLogo}
        alt="логотип Место."
        className="logo header__logo"
      />
      <div className="header__container">
        <Switch>
          <Route exact path="/">
            <p className="header__email">{currentEmail}</p>
            <button
              onClick={() => handleClick("/signin")}
              className="header__link header__link_color_dark"
            >
              Выйти
            </button>
          </Route>
          <Route path="/signup">
            <button
              onClick={() => handleClick("/signin")}
              className="header__link"
            >
              Войти
            </button>
          </Route>
          <Route path="/signin">
            <button
              onClick={() => handleClick("/signup")}
              className="header__link"
            >
              Регистрация
            </button>
          </Route>
        </Switch>
      </div>
    </header>
  );
}
