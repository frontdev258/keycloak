/**
 * Author: Alireza Dadrass & Hesam Mehrizi
 * Description: Custom Spinner for MATNA
 */

import React from "react";
import "./CustomSpinner.scss";
import logo from "../../assets/img/logo.png";

const CustomSpinner = ({ title = "درحال بارگذاری", size = "small" }) => {
  return (
    <div className="loading-container">
      <div className={`loading spinner-${size}`}>
        <div className="parent">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div>
          <hr className="divider" />
          <h3 className="matna-title">مرکز تولید نرم افزار آجا</h3>
          <div className="loading-text">
            <h5 className="loading-h">{title}</h5>
            <div className="loading-dots-bg">
              <span className="loading-dots">.</span>
              <span className="loading-dots">.</span>
              <span className="loading-dots">.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomSpinner;
