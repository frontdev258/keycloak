import LogoImage from "../../assets/img/logo.png";
import {Link} from "react-router-dom";
import React from "react";
import './Header.scss';

const Header = () => {
  return <header className="header">
    <div className="header__logo">
      <img
        src={LogoImage}
        className="header__logo__img"
        alt="ارتش جمهوری اسلامی ایران"
      />
      <p className="header__logo__title">سامانه جامع سیستم ها </p>
    </div>

    <Link className="logout__btn" to={"logout"}>
      خروج
    </Link>
  </header>
}

export default Header;
