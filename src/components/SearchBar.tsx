import React from "react";
const SearchBar = ({ query, onChange }: { query: any; onChange: any }) => {
    return (
      <input
        className="search-input"
        type="text"
        placeholder="Search Cageflix..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  };
  
  export default SearchBar;
  