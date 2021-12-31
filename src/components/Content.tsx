import { useWatchMe } from "../hooks/useWatchMe";
import { MovieCard } from "./MovieCard";
import { Header } from "./Header";

export function Content() {
  const { selectedGenre, movies } = useWatchMe();

  return (
    <div className="container">
      <Header title={selectedGenre.title} />
      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
