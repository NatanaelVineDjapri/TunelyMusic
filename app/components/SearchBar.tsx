import React from "react";

interface SearchBarProps {
  query: string;
  setQuery: (val: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, onSearch }) => {
  return (
    <div className="mb-4 d-flex ">
      <input
        type="text"
        className="form-control me-2 py-3"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari lagu yang kamu inginkan ! "
      />
      <button className="btn btn-success" onClick={onSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
