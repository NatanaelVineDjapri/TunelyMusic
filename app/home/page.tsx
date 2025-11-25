"use client";

import React, { useState, useEffect } from "react";
import { searchSongs } from "@/services/iTunesServices";
import HeroHome from "../components/HeroHome";
import SearchBar from "../components/SearchBar";
import SongSection from "../components/SongSection";
import Pagination from "../components/Pagination";

const limit = 25;

const HomePage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const [recommendedSongs, setRecommendedSongs] = useState<any[]>([]);
  const [recPage, setRecPage] = useState(1);
  const totalPages = 40;

  useEffect(() => {
    const fetchRecommended = async () => {
      const queries = ["pop", "rock", "jazz", "classical", "hiphop"];
      const randomQueries = queries.sort(() => 0.5 - Math.random()).slice(0, 2);
      let recommended: any[] = [];
      for (const q of randomQueries) {
        const results = await searchSongs(q, limit, recPage);
        recommended = [...recommended, ...results];
      }
      recommended = recommended.sort(() => 0.5 - Math.random());
      setRecommendedSongs(recommended);
    };
    fetchRecommended();
  }, [recPage]);

  const handleSearch = async () => {
    if (!query) return;
    const results = await searchSongs(query, 200);
    setSearchResults(results);
  };

  return (
    <div className="container mt-4">
      <HeroHome />
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

      {searchResults.length > 0 && (
        <SongSection title="Hasil Pencarian" songs={searchResults} />
      )}

      <p className="mb-5 bg-white p-3 rounded-3 fw-bold text-center fs-3">
        Rekomendasi Musik🎵🎧
      </p>
      <SongSection songs={recommendedSongs} />
      <Pagination page={recPage} setPage={setRecPage} totalPages={totalPages} />
    </div>
  );
};

export default HomePage;
