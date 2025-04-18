import React from 'react';
import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { simpleSearch } from '../utils/simpleSearch';
import '../index.css';
import { lstat } from 'fs';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);

  const list = [
    {
      "id": "1",
      "title": "Face/Off",
      "year": 1997,
      "genres": ["Action", "Sci-Fi"],
      "description": "An FBI agent undergoes surgery to assume the identity of a terrorist.",
      "actors": ["Nicolas Cage", "John Travolta"],
      "poster": "https://via.placeholder.com/300x450?text=Face%2FOff"
    },
    {
      "id": "2",
      "title": "National Treasure",
      "year": 2004,
      "genres": ["Action", "Adventure"],
      "description": "A historian races to find treasure hidden by the Founding Fathers.",
      "actors": ["Nicolas Cage", "Diane Kruger"],
      "poster": "https://via.placeholder.com/300x450?text=National+Treasure"
    },
  ]

  useEffect(() => {
    setMovies(list)
  }, []);

  useEffect(() => {
    setFiltered(simpleSearch(query, movies));
  }, [query, movies]);

  return (
    <div className="container">
      <div style={styles.container}>
        <h1 style={{ textAlign: 'center' }}> Cageflix</h1>
        <SearchBar query={query} onChange={setQuery} />
      </div>

      <div className="grid">
        {filtered.map((movie) => (
          <MovieCard key={movie} movie={movie} />
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
    display: 'flex',
    FlexDirection: 'row',
    // JustifyContent: 'space-between',
  },
};

export default Home;
