import React from "react";

const MovieCard = ({ movie }: { movie: any }) => (
    <div className="card">
      <img src={movie.poster} alt={movie.title} />
      <h2>
        {movie.title} ({movie.year})
      </h2>
      <p>
        <strong>Genres:</strong> {movie.genres.join(', ')}
      </p>
      <p>{movie.description}</p>
      <p>
        {/* <em>Actors: {movie.actors.join(', ')}</em> */}
      </p>
    </div>
  );
  
  export default MovieCard;
  