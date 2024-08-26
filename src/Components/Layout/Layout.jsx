import Header from "../Header/Header";
import React from "react";

const Layout = ({children}) => {
  return <>
    <Header/>
    <div style={{padding: '16px'}}>
      {children}
    </div>
  </>
}

export default Layout;
