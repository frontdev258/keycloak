import jwtDecode from "jwt-decode";
import "./Dashboard.scss";
import React, {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {useAuth} from "../../hooks/useAuth";
import {Navigate, useNavigate} from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner";
import Header from "../../Components/Header/Header";

const Dashboard = () => {
  const {getApi} = useAuth();
  const keycloak = localStorage.getItem("keycloak");
  const [sub, setSub] = useState();
  const navigate = useNavigate();
  // const { access_token: token, refresh_token } = JSON.parse(keycloak);
  const {access_token: token, refresh_token} = keycloak
    ? JSON.parse(keycloak)
    : {access_token: null, refresh_token: null};
  useEffect(() => {
    if (token) {
      let {sub} = jwtDecode(token);
      setSub(sub);
    }
  }, [token]);

  const {data, status, refetch} = useQuery(
    `/api/users/${sub}/roles`,
    getApi,
    {
      enabled: !!sub
    }
  );

  return (
    <div className="dashboard">
      <div className="dashboard__main">
        {/*{status === "loading" ? (*/}
        {/*  <CustomSpinner />*/}
        {/*) : status === "error" ? (*/}
        {/*  <h3>*/}
        {/*    خطا در انجام عملیات <span onClick={refetch}>تلاش مجدد</span>*/}
        {/*  </h3>*/}
        {/*) : status === "success" ? (*/}
        <>
          <div className="content">
            <h4 style={{
              fontSize: '24px',
              marginBlock: '0.5em'
            }}>سامانه‌های مدیران</h4>
            <div className="list flex_wrap">
              {/*<a*/}
              {/*    className="panels"*/}
              {/*    target="_blank"*/}
              {/*    rel="noreferrer"*/}
              {/*    href={`http://192.180.9.217:3000/?token=${token}&refreshToken=${refresh_token}`}*/}
              {/*>*/}
              {/*  سامانه مدیریت کاربران و سطوح دسترسی*/}
              {/*</a>*/}
              <button
                className="panels"
                onClick={() => navigate('/user/list')}>
              >
                سامانه مدیریت کاربران و سطوح دسترسی
              </button>
            </div>
            <hr/>
            <h4 style={{
              fontSize: '24px',
              marginBlock: '0.5em'
            }}>کارتابل های در دسترس</h4>
            <div className="list flex_wrap">
              {status === "loading" ? (
                <CustomSpinner/>
              ) : status === "error" ? (
                <h3>
                  خطا در انجام عملیات <span onClick={refetch}>تلاش مجدد</span>
                </h3>
              ) : status === "success" ? (data.map((value) => (
                <a
                  className="clients"
                  target="_blank"
                  rel="noreferrer noopener"
                  key={value.id}
                  href={`${value.url}/?token=${token}&refreshToken=${refresh_token}`}
                >
                  {value.description}
                </a>
              ))) : null}
            </div>
          </div>
        </>
        {/*) : null}*/}
      </div>

      <Footer/>
    </div>
  );
};

export default Dashboard;
