"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/authServices";
import Image from "next/image";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser(username, password);
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container" style={{ minHeight: "50vh", paddingTop:"20vh" }}>
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-6 d-none d-md-flex justify-content-center">
          <Image
            src="/images/gmbr3.jpg" 
            alt="Foto"
            width={500}
            height={390}
            className="rounded-4 shadow"
          />
        </div>

        {/* Kolom kanan: form */}
        <div className="col-12 col-md-6">
          <div className="card p-4 shadow-sm">
            <h2 className="mb-4 text-center">Register</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleRegister}>
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
                Register
              </button>
            </form>
            <p className="mt-3 text-center">
              Sudah punya akun?{" "}
              <a href="/login" className="text-success">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
