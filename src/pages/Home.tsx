import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { fuzzySearch } from "../utils/fuzzySearch";
import "../index.css";

interface HomeProps {
  searchQuery: string;
}

interface Meta {
  total: number;
  page: number;
  perPage: number;
}

const Home: React.FC<HomeProps> = ({ searchQuery }) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [meta, setMeta] = useState<Meta>({ total: 0, page: 1, perPage: 20 });
  const [loading, setLoading] = useState<boolean>(false);

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
    const results = searchQuery
      ? fuzzySearch(movies, searchQuery, {
          keys: ["title", "genres"],
          threshold: 0.3,
        })
      : movies;
    setFiltered(results);
  }, [searchQuery, movies]);

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
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
    flexDirection: "column" as React.CSSProperties["flexDirection"],
    alignItems: "center" as React.CSSProperties["alignItems"],
    width: "100%",
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "10px",
    marginTop: "80px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "16px",
    width: "100%",
  },
  loading: {
    textAlign: "center" as React.CSSProperties["textAlign"],
    padding: "16px",
    fontSize: "1rem",
    color: "#888",
  },
};

export default Home;
