"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Register failed");

      router.push("/login"); // setelah register redirect ke login
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card p-4 shadow-sm" style={{ width: "100%", maxWidth: 400 }}>
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
          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
        <p className="mt-3 text-center">
          Sudah punya akun? <a href="/login" className="text-success">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
