import React from "react";
// import { ConfigProvider } from "antd";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import "./assets/styles/global.scss";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Logout from "./pages/Logout/Logout";
import UserCrud from "./pages/User/UserCrud";
import UserList from "./pages/User/UserList";
import Layout from "./Components/Layout/Layout";

const App = () => {
  const keycloak = localStorage.getItem("keycloak");
  const isUserLoggedIn = !!keycloak;
  // const isUserLoggedIn = true;

  const ProtectedRoute = ({children}) => {
    if (!isUserLoggedIn) {
      return <Navigate to='/login'/>;
    }
    return <Layout>{children ? children : <Outlet/>}</Layout>
  }

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute/>}>
          <Route path="/user">
            <Route path='list'
                   index
                   element={<UserList/>}/>
            <Route path=':id'
                   index
                   element={<UserCrud/>}/>
          </Route>
          <Route path="/"
                 index
                 element={<Dashboard/>}/>
          <Route
            path="/logout"
            index
            element={<Logout/>}
          />
          <Route
            path="*"
            element={<Navigate to={"/"}/>}
          />
        </Route>
        {
          !isUserLoggedIn ? (<Route path="/login" element={<Login/>}/>) : null
        }
      </Routes>
    </>
  );
};

export default App;
