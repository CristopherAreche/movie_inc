import { useEffect, useState } from "react";
import { fetchNowPlayingMovies } from "../../services/tmbd";
import { Movie } from "../../services/tmbd.types";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import MovieCard from "../../components/MovieCard";
import { sortMoviesByTitle } from "../../utils/sort";
import { useSearch } from "../../provider/SearchContext";
import styles from "./Home.module.css";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { query } = useSearch();
  const filteredMovies =
    query.trim() === ""
      ? sortMoviesByTitle(movies, "asc")
      : sortMoviesByTitle(
          movies.filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase())
          ),
          "asc"
        );

  useEffect(() => {
    fetchNowPlayingMovies().then(setMovies).catch(console.error);
  }, []);

  return (
    <>
      <Header />
      <SearchBar />
      <div className={styles.mainContainer}>
        <h2 className={styles.mainSubtitle}>Now Playing</h2>
        <div className="movie-list">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} compact={false} />
          ))}
        </div>
      </div>
    </>
  );
}
