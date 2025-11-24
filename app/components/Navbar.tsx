"use client";

import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div className="container-fluid px-4">

        <a className="navbar-brand fw-bold fs-3" href="#">
          <span style={{ color: "#15803d" }}>TunelyMusic</span>
          <span className="text-dark">.</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ms-auto me-4 gap-3">
            <li className="nav-item">
              <a className="nav-link fw-medium text-dark" href="#">Akun</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium text-dark" href="#">Login</a>
            </li>
          </ul>

          <button className="btn text-white px-4 py-2" style={{ backgroundColor: "#16a34a" }}>
            Register
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
