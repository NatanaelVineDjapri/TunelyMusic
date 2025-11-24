"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { getSongDetail } from "@/services/iTunesServices";
import { addBookmark, removeBookmark } from "@/services/bookmarkService";

interface Song {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  primaryGenreName: string;
  releaseDate: string;
  trackPrice: number;
  currency: string;
  country: string;
  trackNumber: string;
  artworkUrl100: string;
  previewUrl: string;
}

const DetailLaguPage: React.FC = () => {
  const { id } = useParams();
  const trackId = Array.isArray(id) ? id[0] : id;
  const [song, setSong] = useState<Song | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!trackId) return;
    getSongDetail(trackId).then((res) => setSong(res));
  }, [trackId]);

  useEffect(() => {
    if (!trackId) return;
    const saved = localStorage.getItem(`bookmark_${trackId}`);
    setBookmarked(saved === "true");
  }, [trackId]);

  const toggleBookmark = async () => {
    const username = localStorage.getItem("username");
    if (!username) return alert("Silakan login terlebih dahulu!");
    if (!song) return;

    const trackIdStr = song.trackId.toString();

    try {
      if (bookmarked) {
        await removeBookmark(trackIdStr, username);
        setBookmarked(false);
        localStorage.setItem(`bookmark_${trackId}`, "false");
      } else {
        await addBookmark(trackIdStr, username);
        setBookmarked(true);
        localStorage.setItem(`bookmark_${trackId}`, "true");
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (!song) return <p className="text-white text-center" style={{marginTop:"45vh"}}>Loading...</p>;

  return (
    <div className="container" style={{ marginTop: "10vh" }}>
      <div className="card shadow-sm p-4 rounded-4 bg-white text-white mt-3">
        <div className="row g-4">
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <Image
              src={song.artworkUrl100.replace("100x100bb.jpg", "400x400bb.jpg")}
              width={400}
              height={400}
              alt={song.trackName}
              className="rounded-4"
            />
          </div>

          <div className="col-md-8 d-flex flex-column justify-content-between bg-secondary rounded-4 p-4">
            <div>
              <h2 className="fw-bold">{song.trackName}</h2>
              <p
                className="text-success mb-2 px-2 rounded-2"
                style={{ display: "inline-block", backgroundColor: "white" }}
              >
                Artis: {song.artistName}
              </p>
              <p className="mb-1">Album: {song.collectionName}</p>
              <p className="mb-1">Genre: {song.primaryGenreName}</p>
              <p className="mb-1">Negara: {song.country}</p>
              <p className="mb-1">Track Number: {song.trackNumber}</p>
              <p className="mb-1">
                Rilis: {new Date(song.releaseDate).toLocaleDateString()}
              </p>
              <p className="mb-1">
                Harga: {song.trackPrice} {song.currency}
              </p>
            </div>

            <div className="m-4 d-flex flex-column flex-md-row align-items-md-center gap-3">
              <audio controls src={song.previewUrl} className="w-100" />
              <button
                className="btn btn-outline-light mt-2 mt-md-0 d-flex align-items-center gap-2 p-3 rounded-3"
                onClick={toggleBookmark}
              >
                {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-light mt-3 rounded-4"
          onClick={() => router.back()}
        >
          Kembali Ke Halaman Sebelumnya
        </button>
      </div>
    </div>
  );
};

export default DetailLaguPage;
