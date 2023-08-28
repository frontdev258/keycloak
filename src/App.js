import React from "react";
// import { ConfigProvider } from "antd";
import { Navigate, Route, Routes } from "react-router-dom";
import "./assets/styles/global.scss";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Logout from "./pages/Logout/Logout";

const App = () => {
  const keycloak = localStorage.getItem("keycloak");
  const isUserLoggedIn = !!keycloak;
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/logout"
          element={isUserLoggedIn ? <Logout /> : <Navigate to="login" />}
        />
        <Route
          path="/"
          element={isUserLoggedIn ? <Dashboard /> : <Navigate to="login" />}
        />
        <Route
          path="*"
          element={<Navigate to={isUserLoggedIn ? "/" : "/login"} />}
        />
      </Routes>
    </>
  );
};

export default App;
