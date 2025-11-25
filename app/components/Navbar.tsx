"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("username");
    setUsername(user);
  }, []);

  const handleProfileClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!username) {
      e.preventDefault();
      alert("Silakan login dulu untuk mengakses profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    alert("Berhasil logout");
    router.push("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div className="container-fluid px-4">
        <Link href="/" className="navbar-brand fw-bold fs-3">
          <span style={{ color: "#15803d" }}>TunelyMusic</span>
          <span className="text-dark">.</span>
        </Link>

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
              <a
                className="nav-link fw-medium text-dark"
                href="/profile"
                onClick={handleProfileClick}
              >
                Profile
              </a>
            </li>

            {!username && (
              <>
                <li className="nav-item">
                  <Link href="/login" className="nav-link fw-medium text-dark">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!username ? (
            <Link
              href="/register"
              className="btn text-white px-4 py-2"
              style={{ backgroundColor: "#16a34a" }}
            >
              Register
            </Link>
          ) : (
            <button onClick={handleLogout} className="btn btn-danger px-4 py-2">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
