import React, { useState } from "react";
import Image from "next/image";
import { FaRegBookmark, FaBookmark, FaInfoCircle } from "react-icons/fa";
import Link from "next/link";

interface SongCardProps {
  song: any;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const imageUrl = song.artworkUrl100.replace("100x100bb.jpg", "400x400bb.jpg");
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div
      className="card h-100 shadow-sm border border-success"
      style={{
        border: "3px solid #000000ff",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <div
        className="position-absolute"
        style={{
          top: "8px",
          right: "8px",
          fontSize: "1.25rem",
          color: bookmarked ? "#1DB954" : "#ffffff",
          zIndex: 10,
        }}
        onClick={(e) => {
          e.stopPropagation();
          setBookmarked(!bookmarked);
        }}
      >
        {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
      </div>
      <Image
        src={imageUrl}
        width={400}
        height={400}
        alt={song.trackName}
        className="w-100"
      />
      <div className="card-body d-flex flex-column">
        <h6 className="card-title text-truncate">{song.trackName}</h6>
        <p className="card-text text-muted text-truncate">{song.artistName}</p>
        <audio controls src={song.previewUrl} className="mt-auto w-100"></audio>

        <button className="btn btn-sm mt-2 d-flex align-items-center gap-2 border border-success rounded-3">
          <Link
            href={`/detaillagu/${song.trackId}`}
            className="text-decoration-none d-flex align-items-center gap-2"
            style={{ color: "black" }}
          >
            <FaInfoCircle />
            Detail Lagu
          </Link>
        </button>
      </div>
    </div>
  );
};

export default SongCard;
