"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/services/profileService";

const EditProfilePage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername) return alert("Username baru tidak boleh kosong");

    try {
      const res = await updateProfile(username, newUsername);
      localStorage.setItem("username", res.newUsername);
      alert("Profile berhasil diupdate!");
      router.push("/profile");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="container" style={{ marginTop: "20vh", maxWidth: "500px" }}>
      <div className="card shadow p-4 rounded-4">
        <h3 className="mb-4 text-center">Edit Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username Saat Ini</label>
            <input
              type="text"
              className="form-control"
              value={username}
              disabled
            />
          </div>
          <div className="mb-5">
            <label className="form-label">Username Baru</label>
            <input
              type="text"
              className="form-control"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 mb-3">
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
