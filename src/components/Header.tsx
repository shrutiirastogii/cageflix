import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Logo from "../assets/logo.png";

interface HeaderProps {
  query: string;
  onSearchChange: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ query, onSearchChange }) => {
  const [initials, setInitials] = useState<string>("");

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setInitials(data.user.initials || "?"))
      .catch(() => setInitials("?"));
  }, []);

  return (
    <header style={styles.header}>
      <img src={Logo} alt="Cageflix Logo" style={styles.logo} />
      <div style={styles.searchWrapper}>
        <SearchBar query={query} onChange={onSearchChange} />
      </div>
      <div style={styles.avatar}>{initials}</div>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#141414",
    padding: "16px 32px",
    boxSizing: "border-box",
    zIndex: 1000,
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
  },
  logo: {
    width: "150px",
    height: "auto",
  },
  searchWrapper: {
    flex: 1,
    margin: "0 24px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "5px",
    backgroundColor: "#E50914",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default Header;
