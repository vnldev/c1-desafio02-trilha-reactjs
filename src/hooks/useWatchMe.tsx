import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface Genre {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}
interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface WatchMeProviderProps {
  children: ReactNode;
}

interface WatchMeContextData {
  movies: Movie[];
  genres: Genre[];
  selectedGenre: Genre;
  changeSelectedGenre: (id: number) => void;
}

const WatchMeContext = createContext<WatchMeContextData>(
  {} as WatchMeContextData
);

export function WatchMeProvider({ children }: WatchMeProviderProps) {
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  function changeSelectedGenre(id: number) {
    setSelectedGenreId(id);
  }

  useEffect(() => {
    api.get<Genre[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then((response) => {
      setMovies(response.data);
    });

    api.get<Genre>(`genres/${selectedGenreId}`).then((response) => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);

  return (
    <WatchMeContext.Provider
      value={{ movies, genres, selectedGenre, changeSelectedGenre }}
    >
      {children}
    </WatchMeContext.Provider>
  );
}

export function useWatchMe() {
  const context = useContext(WatchMeContext);
  return context;
}
