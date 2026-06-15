import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../../styles/Layout.css";

const Layout = ({ children }) => {
  return (
    <>
      {/* Under Construction Banner */}
      {/* <div style={{
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
      </div> */}

      {/* Push navbar down to accommodate the banner */}
      <style>
        {`
          .navbar {
            top: 0px !important; /* Height of the banner */
          }
        `}
      </style>

      <Header />
      {/* The background grid lives behind everything */}
      <div className="grid-lines"></div>

      {/* Shared wrapper: page content + footer in one stacking context.
          The layout-footer-glow ensures the warm red reaches the footer area. */}
      <div style={{
        position: "relative",
        overflowX: "clip",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
      }}>
        {/* Permanent bottom-of-page glow — always bleeds into footer without extending height */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0, contain: "paint" }}>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-10vh",
              left: "-10vw",
              width: "55vw",
              height: "55vw",
              background: "radial-gradient(circle, rgba(184,0,0,0.55) 0%, transparent 50%)",
              filter: "blur(80px)",
              borderRadius: "50%",
              pointerEvents: "none",
              mixBlendMode: "screen",
            }}
          />
        </div>
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
