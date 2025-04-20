import React, { useMemo, useState } from "react";
import Poster1 from "../assets/poster1.png";
import Poster2 from "../assets/poster2.png";
import Poster3 from "../assets/poster3.png";
import Poster4 from "../assets/poster4.png";

const posters = [Poster1, Poster2, Poster3, Poster4];
const MovieCard: React.FC<{ movie: any }> = ({ movie }) => {
  const [hover, setHover] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const randomPoster = useMemo(
    () => posters[Math.floor(Math.random() * posters.length)],
    []
  );

  return (
    <>
      <div
        style={{
          ...styles.card,
          transform: hover ? "translateY(-14px)" : "translateY(0)",
        }}
        onMouseEnter={(e) => {
          setHover(true);
        }}
        onMouseLeave={(e) => {
          setHover(false);
        }}
        onClick={() => setShowModal(true)}
      >
        <img src={randomPoster} alt={movie.title} style={styles.poster} />
        <div style={{ ...styles.content, opacity: 1 }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2 style={styles.title}>
              {movie.title}
              {/* <span style={styles.year}>({movie.year})</span> */}
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
      </div>
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            <button
              style={styles.closeButtonn}
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <div style ={styles.modalInfo}>
              <p style={{ color: "white" }}>hellp World</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    width: '100%',            
    aspectRatio: '280 / 200', 
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '5px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
  },
  poster: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover', 
    backgroundColor: '#000', 
    display: 'block',
  },
  content: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "#fff",
    transition: "opacity 0.3s ease",
  },
  title: {
    fontSize: "1.25rem",
    margin: 0,
    fontWeight: "bold",
    maxLines: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    overflowWrap: "break-word",
    whiteSpace: "nowrap",
  },
  year: {
    fontWeight: "normal",
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
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContainer: {
    position: "relative",
    width: "80vw",
    maxWidth: "800px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "8px",
    overflow: "hidden",
    aspectRatio: "16/9",
  },
  closeButtonn: {
    position: "absolute",
    top: "16px",
    right: "16px",
    background: "rgba(0,0,0,0.6)",
    border: "none",
    color: "#fff",
    fontSize: "1.5rem",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  modalInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(to top,rgba(0,0,0,0.8),transparent)",
    color: "#fff",
    padding: "24px",
    boxSizing: "border-box",
  },
};

export default MovieCard;
