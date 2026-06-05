import React from "react";
import LightHeader from "../Layout/LightHeader";
import Footer from "../Layout/Footer";

const LightLayout = ({ children }) => {
  return (
    <>
      <LightHeader />
      {/* The background grid lives behind everything */}
      {/* <div className="grid-lines"></div> */}

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default LightLayout;
