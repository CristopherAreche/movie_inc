import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import styles from "./FavoritesPage.module.css";
import { useEffect, useState } from "react";
import { getFavorites } from "../../utils/favorites";
import { Movie } from "../../services/tmbd.types";
import MovieCard from "../../components/MovieCard";
import { FaRegFolderOpen } from "react-icons/fa";
import { useSearch } from "../../provider/SearchContext";
import { sortMoviesByTitle } from "../../utils/sort";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const { query } = useSearch();
  const filteredMovies =
    query.trim() === ""
      ? sortMoviesByTitle(favorites, "asc")
      : sortMoviesByTitle(
          favorites.filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase())
          ),
          "asc"
        );

  useEffect(() => {
    const storedFavorites = getFavorites();
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== id));
  };

  return (
    <>
      <Header />
      <SearchBar />
      <div className={styles.mainContainer}>
        <h2 className={styles.mainSubtitle}>Favorites</h2>
        {favorites.length === 0 ? (
          <div className={styles.emptyState}>
            <FaRegFolderOpen size={60} color="#999" />
            <p>No favorites yet.</p>
          </div>
        ) : (
          <div className={styles.movieList}>
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                compact={false}
                onRemove={handleRemoveFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
