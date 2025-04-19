import React from "react";
const SearchBar = ({ query, onChange }: { query: any; onChange: any }) => {
  return (
    <input
      style={styles.searchInput}
      type="text"
      placeholder="Titles, people, genres"
      value={query}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

const styles = {
  searchInput: {
    padding: "10px",
    width: "50%",
    fontSize: "14px",
    border: "1px solid #ccc",
    maxHeight: "10px",
    borderColor: "#fff",
    backgroundColor: "#141414",
    color: "#fff",
    cursor: "text",
  },
};

export default SearchBar;
