import React from "react";
import LightHeader from "./LightHeader";
import Footer from "./Footer";
import "../../styles/Layout.css";

const LightLayout = ({ children }) => {
  return (
    <div className="light-layout-wrapper" style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh"
    }}>
      <LightHeader />
      {/* The background grid lives behind everything */}
      <div className="grid-lines grid-lines-dark"></div>

      <main style={{ paddingTop: "5rem", flex: 1 }}>{children}</main>

      <Footer />
    </div>
  );
};

export default LightLayout;
