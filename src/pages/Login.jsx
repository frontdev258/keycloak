import React from "react";
import "./Login.scss";
import LogoImage from "../assets/img/logo.png";
import Footer from "./Footer";

const Login = () => {
  function login(username, password) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "residence-ui");
    urlencoded.append("client_secret", "ZrWUmP2RSCUBm5JvmSL4QLh5B5PqIm4b");
    urlencoded.append("grant_type", "password");
    urlencoded.append("username", username);
    urlencoded.append("password", password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(
      "http://192.180.9.79:9080/auth/realms/mtna/protocol/openid-connect/token",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        window.localStorage.setItem("keycloak", result);
        window.location.pathname = "/";
      })
      .catch((error) => console.log("error", error));
  }
  return (
    <div className="login">
      <h1 className="login__title"> ورود به پنل کاربری</h1>
      <div className="login__wrapper">
        <form
          onSubmitCapture={(e) => {
            e.preventDefault();
            let elements = e.target.elements;
            login(elements.username.value, elements.password.value);
          }}
          className="login__form"
        >
          <div className="login__input">
            <label htmlFor="username">:نام کاربری</label>
            <input name="username" id="username" />
          </div>
          <div className="login__input">
            <label htmlFor="password">:رمز عبور</label>
            <input type="password" name="password" id="password" />
          </div>

          <button type="submit">ورود</button>
        </form>
        <div className="login__logo">
          <img
            src={LogoImage}
            class="login__logo__img"
            alt="ارتش جمهوری اسلامی ایران"
          />
          <p class="login__logo__title">سامانه جامع سیستم ها </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
