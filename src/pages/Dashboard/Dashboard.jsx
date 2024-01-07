import jwtDecode from "jwt-decode";
import "./Dashboard.scss";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import LogoImage from "../../assets/img/logo.png";
import Footer from "../../Components/Footer/Footer";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner";

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
    getApi,
      {
        enabled: !!sub
      }
  );

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__header__logo">
          <img
            src={LogoImage}
            className="dashboard__header__logo__img"
            alt="ارتش جمهوری اسلامی ایران"
          />
          <p className="dashboard__header__logo__title">سامانه جامع سیستم ها </p>
        </div>

        <Link className="logout__btn" to={"logout"}>
          خروج
        </Link>
      </header>

      <div className="dashboard__main">
        {status === "loading" ? (
          <CustomSpinner />
        ) : status === "error" ? (
          <h3>
            خطا در انجام عملیات <span onClick={refetch}>تلاش مجدد</span>
          </h3>
        ) : status === "success" ? (
          <>
            <div className="content">
              <h4 style={{
                fontSize: '24px',
                marginBlock: '0.5em'
              }}>سامانه‌های مدیران</h4>
              <div className="list flex_wrap">
                <a
                    className="panels"
                    target="_blank"
                    rel="noreferrer"
                    href={`http://192.180.9.217:3000/?token=${token}&refreshToken=${refresh_token}`}
                >
                  سامانه مدیریت کاربران و سطوح دسترسی
                </a>
              </div>
              <hr/>
                <h4 style={{
                    fontSize: '24px',
                    marginBlock: '0.5em'
                }}>کارتابل های در دسترس</h4>
              <div className="list flex_wrap">
                {data.map((value) => (
                    <a
                        className="clients"
                        target="_blank"
                        rel="noreferrer noopener"
                        key={value.id}
                        href={`${value.url}/?token=${token}&refreshToken=${refresh_token}`}
                    >
                      {value.description}
                    </a>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
