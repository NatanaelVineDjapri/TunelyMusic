"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="en">
      <body
        className="d-flex flex-column min-vh-100"
        style={{
          background: "linear-gradient(135deg, #191414 0%, #1DB954 100%)",
        }}
      >
        <Navbar />

        <main className="flex-grow-1 d-flex justify-content-center align-items-start p-4">
          {children}
        </main>


        <Footer />
      </body>
    </html>
  );
}
