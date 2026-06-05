import React from "react";
import LightHeader from "./LightHeader";
import Footer from "./Footer";
import "../../styles/Layout.css";

const LightLayout = ({ children }) => {
  return (
    <div className="light-layout-wrapper">
      <LightHeader />
      {/* The background grid lives behind everything */}
      <div className="grid-lines grid-lines-dark"></div>

      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default LightLayout;
