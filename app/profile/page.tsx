"use client";

import React, { useEffect, useState } from "react";
import { fetchProfile } from "@/services/profileService";
import Image from "next/image";
import Link from "next/link";
import { getSongDetail } from "@/services/iTunesServices";

interface Bookmark {
  id: number;
  user_id: number;
  track_id: string;
}

interface User {
  id: number;
  username: string;
}

interface Song {
  trackId: number;
  trackName: string;
  artworkUrl100: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      setError("User not logged in");
      return;
    }

    fetchProfile(username)
      .then(async (data) => {
        setUser(data.user);
        setBookmarks(data.bookmarks);

        // fetch detail tiap lagu
        const songsData: Song[] = [];
        for (const b of data.bookmarks) {
          try {
            const songDetail = await getSongDetail(b.track_id);
            songsData.push({
              trackId: songDetail.trackId,
              trackName: songDetail.trackName,
              artworkUrl100: songDetail.artworkUrl100,
            });
          } catch (err) {
            console.error("Gagal fetch detail lagu:", b.track_id);
          }
        }
        setSongs(songsData);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="text-danger text-center mt-5">{error}</p>;
  if (!user)
    return (
      <p className="text-center text-white" style={{ marginTop: "45vh" }}>
        Loading...
      </p>
    );

  return (
    <div className="container" style={{ marginTop: "18vh" }}>
      <div className="card p-5 rounded-3 shadow d-flex flex-column flex-md-row gap-5">
        <div className="col-md-4 d-flex justify-content-center align-items-start mt-3">
          <Image
            src={"/images/pfp1.jpg"}
            alt="Profile Image"
            width={400}
            height={400}
            className="rounded-4 bg-success p-3"
          />
        </div>

        <div className="col-md-8">
          <h2 className="mb-3">Profile User</h2>
          <h4 className="mb-3">Username: {user.username}</h4>
          <h4>Bookmarks</h4>
          <div
            className="d-grid gap-3"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)", // 3 kolom
              marginTop: "1rem",
            }}
          >
            {songs.map((s, idx) => (
              <Link
                key={`${s.trackId}-${idx}`}
                href={`/detaillagu/${s.trackId}`}
                className="d-flex flex-column align-items-center text-success text-decoration-none"
                style={{
                  border: "1px solid #ccc", // garis tepi
                  borderRadius: "8px", // sudut membulat
                  padding: "10px",
                  backgroundColor: "#fff",
                  textAlign: "center",
                }}
              >
                <Image
                  src={s.artworkUrl100.replace(
                    "100x100bb.jpg",
                    "200x200bb.jpg"
                  )}
                  alt={s.trackName}
                  width={120}
                  height={120}
                  className="rounded-3"
                />
                <span className="mt-2" style={{ wordBreak: "break-word" }}>
                  {s.trackName}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
