import React, { useEffect, useState } from "react";
import Poster from "../assets/poster.png";

const MovieCard: React.FC<{ movie: any }> = ({ movie }) => {
  const [hover, setHover] = useState(false);

  useEffect(() => {}, []);

  return (
    <div
      style={{
        ...styles.card,
        transform: hover ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={(e) => {
        setHover(true);
      }}
      onMouseLeave={(e) => {
        setHover(false);
      }}
    >
      <img src={Poster} alt={movie.title} style={styles.poster} />
      {hover && (
        <div style={styles.content}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2 style={styles.title}>
              {movie.title}
              <span style={styles.year}>({movie.year})</span>
            </h2>
          </div>
          <p style={styles.genres}>
            <strong>Genres:</strong> {movie.genres.join(", ")}
          </p>
          <p style={styles.description}>{movie.description}</p>
          {movie.actors && (
            <p style={styles.actors}>Actors: {movie.actors.join(", ")}</p>
          )}
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#141414",
    color: "#ffffff",
    borderRadius: "5px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
    overflow: "hidden",
    transition: "transform 0.2s ease-in-out",
    cursor: "pointer",
  },
  cardHover: {
    transform: "translateY(-4px)",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  content: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  title: {
    fontSize: "1.25rem",
    margin: 0,
    fontWeight: "bold",
  },
  year: {
    fontWeight: "normal" ,
    color: "#bbbbbb",
    marginLeft: "8px",
  },
  genres: {
    fontSize: "0.9rem",
    margin: 0,
  },
  description: {
    fontSize: "0.85rem",
    margin: 0,
    color: "#dddddd",
  },
  actors: {
    fontSize: "0.8rem",
    margin: 0,
    fontStyle: "italic",
    color: "#aaaaaa",
  },
};

export default MovieCard;
