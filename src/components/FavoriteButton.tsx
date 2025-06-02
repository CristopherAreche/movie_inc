import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { isFavorite, addFavorite, removeFavorite } from "../utils/favorites";
import styles from "./favoriteButton.module.css";
import { Movie } from "../services/tmbd.types";

type Props = {
  movie: Movie;
  onRemove?: (id: number) => void;
};

export default function FavoriteButton({ movie, onRemove }: Props) {
  const [liked, setLiked] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLiked(isFavorite(movie.id));
  }, [movie.id]);

  const toggleFavorite = () => {
    if (liked) {
      removeFavorite(movie.id);
      setLiked(false);
      if (onRemove) onRemove(movie.id);
      setMessage("Removed");
    } else {
      addFavorite(movie);
      setLiked(true);
      setMessage("Added");
    }

    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className={`${styles.wrapper} ${styles.compact ? "compact" : ""}`}>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite();
        }}
        className={styles.heartButton}
      >
        <FaHeart
          size={20}
          color={liked ? "#d19aae" : "#999"}
          fill={liked ? "#d19aae" : "#999"}
        />
      </button>
      {message && <span className={styles.message}>{message}</span>}
    </div>
  );
}
