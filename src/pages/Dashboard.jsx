import jwtDecode from "jwt-decode";
import "./Dashboard.scss";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import LogoImage from "../assets/img/logo.png";
import Footer from "./Footer";

const Dashboard = () => {
  const { getApi } = useAuth();
  const keycloak = localStorage.getItem("keycloak");
  const [sub, setSub] = useState();
  // const { access_token: token, refresh_token } = JSON.parse(keycloak);
  const { access_token: token, refresh_token } = keycloak
    ? JSON.parse(keycloak)
    : { access_token: null, refresh_token: null };
  useEffect(() => {
    if (token) {
      let { sub } = jwtDecode(token);
      setSub(sub);
    }
  }, [token]);

  const { data, status, refetch } = useQuery(
    `http://192.180.9.79:9000/api/users/${sub}/roles`,
    getApi
  );

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__header__logo">
          <img
            src={LogoImage}
            class="dashboard__header__logo__img"
            alt="ارتش جمهوری اسلامی ایران"
          />
          <p class="dashboard__header__logo__title">سامانه جامع سیستم ها </p>
        </div>

        <Link className="logout__btn" to={"logout"}>
          خروج
        </Link>
      </header>

      <div className="dashboard__main">
        {status === "loading" ? (
          <h3>شکیبا باشید</h3>
        ) : status === "error" ? (
          <h3>
            خطا در انجام عملیات <span onClick={refetch}>تلاش مجدد</span>
          </h3>
        ) : status === "success" ? (
          <>
            {/* {data.map((value) => (
              <a
                className="clients"
                href={`${value.url}/?token=${token}&refreshToken=${refresh_token}`}
              >
                {value.description}
              </a>
            ))} */}
            <a
              className="clients"
              href={`http://192.168.4.20:3000/?token=${token}&refreshToken=${refresh_token}`}
            >
              سامانه صدور مجوز مراکز درمانی
            </a>
          </>
        ) : null}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
