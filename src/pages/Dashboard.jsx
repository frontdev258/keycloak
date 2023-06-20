import jwtDecode from "jwt-decode";
import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { getApi, refreshToken } = useAuth();
  const keycloak = localStorage.getItem("keycloak");
  const [, setRefresh] = useState(1);
  const { access_token: token } = JSON.parse(keycloak);
  const { sub } = jwtDecode(token);

  const { data, status, refetch } = useQuery(
    `http://192.180.9.79:9000/api/users/${sub}/roles`,
    getApi
  );

  return (
    <div>
      <h1>سامانه جامع</h1>
      <button
        onClick={() => {
          refreshToken();
          setRefresh((p) => p + 1);
        }}
      >
        refresh token
      </button>
      <button
        onClick={() => {
          localStorage.removeItem("keycloak");
          window.location.pathname = "/";
        }}
      >
        sign out
      </button>
      <div>
        {status === "loading" ? (
          <h3>شکیبا باشید</h3>
        ) : status === "error" ? (
          <h3>
            خطا در انجام عملیات <span onClick={refetch}>تلاش مجدد</span>
          </h3>
        ) : status === "success" ? (
          <>
            {data.map((value) => (
              <a href={value.url}>{value.description}</a>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
