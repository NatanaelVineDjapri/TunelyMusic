import React from "react";

const HeroHome: React.FC = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center rounded-4 text-white mb-5 mt-5"
      style={{
        height: 300,
        backgroundImage: "url('/images/gmbr2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="text-center p-5 rounded-3 w-100 h-100"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      >
        <h1
          className="fw-bold display-5 text-success mt-3"
          style={{ textShadow: "1px 1px 2px rgba(255, 255, 255, 0.7)" }}
        >
          Selamat Datang di TunelyMusic!
        </h1>
        <p className="text-black">
          Dengerin lagu favoritmu langsung dari sini 🎵
        </p>
        <button className="btn btn-success btn-lg mt-2">Mulai Denger</button>
      </div>
    </div>
  );
};

export default HeroHome;
