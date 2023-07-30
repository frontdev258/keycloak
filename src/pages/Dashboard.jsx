import jwtDecode from "jwt-decode";
import "./Dashboard.scss";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { getApi } = useAuth();
  const keycloak = localStorage.getItem("keycloak");
  const [sub, setSub] = useState();
  const { access_token: token, refresh_token } = JSON.parse(keycloak);
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
      <nav className="dashboard__navbar">
        <h1>سامانه جامع</h1>
      </nav>

      <div className="dashboard__main" style={{ marginTop: "16px" }}>
        {status === "loading" ? (
          <h3>شکیبا باشید</h3>
        ) : status === "error" ? (
          <h3>
            خطا در انجام عملیات <span onClick={refetch}>تلاش مجدد</span>
          </h3>
        ) : status === "success" ? (
          <>
            {data.map((value) => (
              <a
                style={{
                  margin: "8px",
                  border: "2px solid black",
                  padding: "16px",
                }}
                href={`${value.url}/?token=${token}&refreshToken=${refresh_token}`}
              >
                {value.description}
              </a>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
