export function simpleSearch(query: any, movies: any) {
    if (!query.trim()) return movies;
  
    const lowerQuery = query.toLowerCase();
  
    return movies.filter(
      (movie: any) =>
        movie.title.toLowerCase().includes(lowerQuery) ||
        movie.description.toLowerCase().includes(lowerQuery) ||
        movie.genres.join(' ').toLowerCase().includes(lowerQuery) ||
        movie.actors.join(' ').toLowerCase().includes(lowerQuery)
    );
  }
  