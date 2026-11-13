"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.css";
import { AuthProvider } from "../context/auth";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "../components/ScrollToTop";
import { useEffect } from "react";

function BootstrapClient() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return null;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" type="image/png" href="/dramantram.png" />
        <title>Dramantram</title>
        {/* Single font load for the entire app */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Russo+One&display=swap"
        />
      </head>
      <body>
        <AuthProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <BootstrapClient />
          <ScrollToTop />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
