import { useEffect, useState } from "react";
import styles from "./movieCard.module.css";
import { FaStar } from "react-icons/fa";
import { fetchMovieDetails } from "../services/tmbd";
import { Movie } from "../services/tmbd.types";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import {
  formatDate,
  formatDuration,
  formatGenres,
  formatCountries,
} from "../utils/format";

type Props = {
  movie: Movie;
  compact: boolean;
  onRemove?: (id: number) => void;
};
export default function MovieCard({ movie, compact = false, onRemove }: Props) {
  const [duration, setDuration] = useState<string>("");
  const [genre, setGenre] = useState<string>("");

  useEffect(() => {
    fetchMovieDetails(movie.id)
      .then((data) => {
        const hrs = Math.floor(data.runtime / 60);
        const mins = data.runtime % 60;
        setDuration(`${hrs} hr ${mins} min`);

        if (data.genres.length > 0) {
          setGenre(data.genres[0].name);
        }
      })
      .catch(console.error);
  }, [movie.id]);

  const posterUrl = `https://image.tmdb.org/t/p/w185${movie.poster_path}`;
  const formattedDate = formatDate(movie.release_date);

  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/movie/${movie.id}`}
      className={`${styles.card} ${compact ? styles.compact : ""}`}
    >
      <div className={styles.cardContent}>
        <div className={styles.cardFavorite}>
          <FavoriteButton movie={movie} onRemove={onRemove} />
        </div>
        <img className={styles.cardImage} src={posterUrl} alt={movie.title} />
        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitle}>{movie.title}</h3>
          <p className={styles.cardDuration}>{duration}</p>
          <p className={styles.cardMeta}>
            {formattedDate} | {genre}
          </p>
          <p className={styles.cardRating}>
            <FaStar /> {movie.vote_average.toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  );
}
