import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
// import { simpleSearch } from "../utils/simpleSearch";
import { fuzzySearch } from "../utils/fuzzySearch";
import "../index.css";
import Logo from "../assets/logo.png";
import { height, padding, width } from "@mui/system";

interface Meta {
  total: number;
  page: number;
  perPage: number;
}

const Home = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [meta, setMeta] = useState<Meta>({ total: 0, page: 1, perPage: 20 });
  const [loading, setLoading] = useState<boolean>(false);
  const [initials, setInitials] = useState<string>('');  

  const fetchMovies = useCallback((pageToFetch: number) => {
    setLoading(true);
    fetch(`/api/movies?page=${pageToFetch}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: { movies: any[]; meta: Meta }) => {
        // append new movies
        setMovies((prev) => [...prev, ...data.movies]);
        setMeta(data.meta);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch('/api/user')
      .then(r => r.json())
      .then(data => {
        setInitials(data.user.initials || '?');
      })
      .catch(() => setInitials('?'));
  }, []);

  useEffect(() => {
    fetch('/api/user')
      .then(r => r.json())
      .then(data => {
        setInitials(data.user.initials || '?');
      })
      .catch(() => setInitials('?'));
  }, []);

  useEffect(() => {
    fetchMovies(page);
  }, [page, fetchMovies]);

  useEffect(() => {
    function handleScroll() {
      if (loading) return;
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      const totalPages = Math.ceil(meta.total / meta.perPage);
      if (nearBottom && page < totalPages) {
        setPage((prev) => prev + 1);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, page, meta.total, meta.perPage]);

  useEffect(() => {
    const results = fuzzySearch(movies, query, {
      keys: ["title", "genres"],
      threshold: 0.3,
    });
    setFiltered(results);
  }, [query, movies]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src={Logo} alt="Cage Flix" style={styles.logo} />
        <SearchBar query={query} onChange={setQuery} />
        <div style={styles.avatar}>{initials}</div>
      </div>

      <div className="grid">
        {filtered.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
      {loading && <p style={styles.loading}>Loading more movies…</p>}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "1300px",
    margin: "0 auto",
    // padding: "10px",
  },
  loading: {
    textAlign: "center",
    padding: "16px",
    fontSize: "1rem",
    color: "#888",
  },
  logo: {
    width: "200px",
    // marginRight: "10px",
    height: "auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // marginBottom: "16px",
    width: "100%",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: '5px',
    backgroundColor: '#E50914',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    transform: "translateY(-40)"
  }
};

export default Home;
