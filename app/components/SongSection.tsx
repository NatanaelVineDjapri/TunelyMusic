import React from "react";
import SongCard from "./SongCard";

interface SongSectionProps {
  title?: string;
  songs: any[];
}

const SongSection: React.FC<SongSectionProps> = ({ title, songs }) => {
  if (!songs || songs.length === 0) return null;

  return (
    <div className="mb-5">
      <h5 className="mb-3">{title}</h5>
      <div className="row g-3 bg-white p-3 rounded-4">
        {songs.map((song) => (
          <div
            key={song.trackId}
            className="col-12 col-sm-6 col-md-4 col-lg-2"
            style={{ flex: "0 0 20%" }}
          >
            <SongCard song={song} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongSection;
