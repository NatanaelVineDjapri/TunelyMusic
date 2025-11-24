import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <section
      className="d-flex align-items-center justify-content-center mt-3"
    
    >
      <div className="row align-items-center g-5 w-100 justify-content-center mt-5">
        <div
          className="col-lg-6 d-flex flex-column justify-content-center align-items-center bg-white p-5"
          style={{ minHeight: "500px" }}
        >
          <h1 className="fw-bold text-dark text-center">
           Dengarkanlah Musik Favoritmu, <br />
            <span className="text-success">di TunelyMusic</span> 🎵
          </h1>
          <p className="mt-3 fs-5 text-center">
            Temukan lagu-lagu terbaik, simpan lagu favorite kamu, dan nikmati musik
            tanpa batas.
          </p>
          <p>Natanael Vine Djapri - 535240042</p>
          <Link
            href="/home"
            className="btn btn-success btn-lg mt-4 px-5 py-2"
          >
            Mulai Sekarang
          </Link>
        </div>

        <div className="col-lg-4 d-flex justify-content-center">
          <div className="bg-dark shadow-sm overflow-hidden bg-white p-5">
            <Image
              src="/images/gmbr1.png"
              width={250}
              height={400}
              alt="Ilustrasi Musik"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
