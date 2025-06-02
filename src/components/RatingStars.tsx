import { useEffect, useState } from "react";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import styles from "./ratingStars.module.css";

type Props = {
  movieId: number;
  onRated?: (value: number) => void;
};

export default function RatingStars({ movieId, onRated }: Props) {
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedRating = localStorage.getItem(`movie_rating_${movieId}`);
    if (storedRating) {
      setRating(parseInt(storedRating));
    } else {
      setRating(null);
    }

    setSubmitted(false);
    setError("");
  }, [movieId]);

  const handleRate = (value: number) => {
    setRating(value);
    localStorage.setItem(`movie_rating_${movieId}`, value.toString());
  };

  return (
    <div className={styles.mainContainer}>
      <p className={styles.mainSubtitle}>Your Rating</p>
      <div className={styles.stars}>
        {[...Array(10)].map((_, i) => {
          const value = i + 1;
          return (
            <button
              key={value}
              className={styles.starButton}
              onClick={() => setRating(value)}
              aria-label={`Rate with ${value}`}
            >
              <FaStar
                size={24}
                color={value <= (rating ?? 0) ? "#d19aae" : "#e4e5e9"}
              />
            </button>
          );
        })}
      </div>

      {submitted ? (
        <div className={styles.confirmation}>
          <FaCheckCircle color="#16a34a" size={20} />
          <span>Thanks for your rating!</span>
        </div>
      ) : (
        <button
          className={styles.submitButton}
          disabled={rating === 0}
          onClick={() => {
            if (rating !== null) {
              handleRate(rating);
              setSubmitted(true);
              setError("");
              setTimeout(() => {
                setSubmitted(false);
              }, 3000);

              onRated?.(rating);
            } else {
              setError("Please select a rating before submitting.");
            }
          }}
        >
          Rate
        </button>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
