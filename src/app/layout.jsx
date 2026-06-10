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
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/dramantram.png" />
        <title>Dramantram</title>
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
