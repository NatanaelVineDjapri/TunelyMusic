"use client";

import React from "react";
import Link from "next/link";

interface ErrorPageProps {
  code?: number;
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ code = 404, message }) => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center vh-80 bg-white rounded-4 vw-100 p-5"
      style={{ marginTop: "25vh" }}
    >
      <h1 className="display-1 fw-bold text-success">{code}</h1>
      <h2 className="fw-semibold text-success">
        {message ||
          (code === 404 ? "Halaman Tidak Ditemukan" : "Terjadi Kesalahan")}
      </h2>
      <p className="mb-4 text-success">
        {code === 404
          ? "Maaf, halaman yang kamu cari tidak adas."
          : "Maaf, terjadi kesalahan pada server."}
      </p>
      <Link href="/" className="btn btn-success btn-lg">
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default ErrorPage;
