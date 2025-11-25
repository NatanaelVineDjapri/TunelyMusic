import React from "react";
import {FaFacebookF,FaTwitter,FaInstagram,FaYoutube,FaSpotify,} from "react-icons/fa";
const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-sm mt-5 py-4">
      <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center px-4">
        <span className="fw-bold fs-2" style={{ color: "#15803d" }}>
          TunelyMusic
        </span>
        <span className="text-dark">.</span>

        <div className="d-flex gap-3">
          <a href="#" target="_blank" className="text-dark fs-5">
            <FaFacebookF />
          </a>
          <a href="#" target="_blank" className="text-dark fs-5">
            <FaTwitter />
          </a>
          <a href="#" target="_blank" className="text-dark fs-5">
            <FaInstagram />
          </a>
          <a href="#" target="_blank" className="text-dark fs-5">
            <FaYoutube />
          </a>
          <a href="#" target="_blank" className="text-dark fs-5">
            <FaSpotify />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
