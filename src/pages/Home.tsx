import React from "react";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { simpleSearch } from "../utils/simpleSearch";
import {fuzzySearch} from '../utils/fuzzySearch';
import "../index.css";
import Logo from "../assets/logo.png";

const Home = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} – ${res.statusText}`);
        }
        return res.json();
      })
      .then((data: { movies: any[] }) => {
        console.log(data.movies, "data");
        setMovies(data.movies);
      })
      .catch((err) => {
        console.error("Failed to fetch movies:", err);
      });
  }, []);

  // useEffect(() => {
  //   setFiltered(simpleSearch(query, movies));
  // }, [query, movies]);

  useEffect(()=>{
    const results = fuzzySearch(
      movies,
      query,
      {
        keys: ['title', 'genres'], 
        threshold: 0.3
      }
    );
    setFiltered(results);
  }, [query, movies]);

  return (
    <div className="container">
      <div style={styles.container}>
        <img
          src={Logo}
          alt="Cage Flix"
          style={{ width: "100px", marginRight: "10px", height: "100%" }}
        />
        <SearchBar query={query} onChange={setQuery} />
      </div>

      <div className="grid">
        {filtered.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    // maxWidth: '800px',
    // margin: '0 auto',
    // padding: '24px',
    // fontFamily: 'Arial, sans-serif',
    display: "flex",
    FlexDirection: "row",
    // JustifyContent: 'space-between',
  },
};

export default Home;
