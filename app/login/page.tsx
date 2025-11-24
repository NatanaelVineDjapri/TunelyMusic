"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { loginUser } from "@/services/authServices";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(username, password);
      localStorage.setItem("username", username);
      router.push("/home");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "50vh", paddingTop:"20vh" }}
    >
      <div className="row justify-content-center align-items-center w-100">
        <div className="col-12 col-md-6 d-flex justify-content-center">
          <div
            className="card p-4 shadow-sm"
            style={{ width: "100%", maxWidth: 600 }}
          >
            <h2 className="mb-4 text-center">Login</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success w-100">
                Login
              </button>
            </form>
            <p className="mt-3 text-center">
              Belum punya akun?{" "}
              <a href="/register" className="text-success">
                Register
              </a>
            </p>
          </div>
        </div>

        <div className="col-12 col-md-6 d-flex justify-content-center mt-4 mt-md-0">
          <Image
            src="/images/gmbr4.jpg"
            alt="Foto"
            width={600}
            height={390}
            className="rounded-4 shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
