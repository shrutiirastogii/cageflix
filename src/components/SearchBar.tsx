import React from "react";
const SearchBar = ({ query, onChange }: { query: any; onChange: any }) => {
    return (
      <input
        // className="search-input"
        style={styles.searchInput}
        type="text"
        placeholder="Titles, people, genres"
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  };

  const styles ={
    searchInput:{
      padding: "10px",
      width: "50%",
      fontSize: "14px",
      border: "1px solid #ccc",
      maxHeight: "10px",
      borderColor: 'white',
      backgroundColor: "#141414",
    }
  }
  
  export default SearchBar;
  