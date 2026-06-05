import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../../styles/Layout.css";

const Layout = ({ children }) => {
  return (
    <>
      {/* Under Construction Banner */}
      <div style={{
        backgroundColor: 'rgba(255, 193, 7, 1)',
        color: '#000',
        textAlign: 'center',
        padding: '8px 20px',
        fontWeight: '600',
        fontSize: '14px',
        letterSpacing: '0.5px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2000, // Higher than navbar (1030)
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span>🚧</span>
        <span>This website is currently under construction. Some features and content may still be updating.</span>
        <span>🚧</span>
      </div>

      {/* Push navbar down to accommodate the banner */}
      <style>
        {`
          .navbar {
            top: 36px !important; /* Height of the banner */
          }
        `}
      </style>

      <Header />
      {/* The background grid lives behind everything */}
      <div className="grid-lines"></div>

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default Layout;
