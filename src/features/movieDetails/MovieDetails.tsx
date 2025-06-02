import styles from "./movieDetails.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchSimilarMovies,
} from "../../services/tmbd";
import { MovieDetailsType, CastMember, Movie } from "../../services/tmbd.types";
import { FaStar } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CastCard from "../../components/CastCard";
import RatingStars from "../../components/RatingStars";
import MovieCard from "../../components/MovieCard";
import FavoriteButton from "../../components/FavoriteButton";
import {
  formatDate,
  formatDuration,
  formatGenres,
  formatCountries,
} from "../../utils/format";
export default function MovieDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [similar, setSimilar] = useState<Movie[]>([]);

  useEffect(() => {
    if (id) {
      fetchMovieDetails(parseInt(id)).then(setMovie).catch(console.error);
      fetchMovieCredits(parseInt(id)).then(setCast).catch(console.error);
      fetchSimilarMovies(Number(id)).then(setSimilar).catch(console.error);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  const formattedDate = formatDate(movie.release_date);
  const duration = formatDuration(movie.runtime);
  const genres = formatGenres(movie.genres);
  const countries = formatCountries(movie.production_countries);

  return (
    <div className={styles.details}>
      <button className={styles.backButton} onClick={() => navigate("/")}>
        <FaArrowLeft size={20} />
      </button>
      <div
        className={styles.backdrop}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w780${movie.backdrop_path})`,
        }}
      />

      <div className={styles.card}>
        <div className={styles.card__favorite}>
          <FavoriteButton movie={movie} />
        </div>
        <img
          className={styles.poster}
          src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={styles.info}>
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.meta}>
            In theater: {formattedDate}
            <br />
            Duration: {duration}
            <br />
            Genre: {genres}
            <br />
            Countries: {countries}
          </p>
          <p className={styles.rating}>
            IMDB <FaStar /> {movie.vote_average.toFixed(1)}
          </p>
        </div>
      </div>
      <div className={styles.mainContainer}>
        <RatingStars movieId={movie.id} />
        <h2 className={styles.mainSubtitle}>Top cast</h2>
        <div className={styles.characterList}>
          {cast.slice(0, 6).map((actor) => (
            <CastCard
              key={actor.id}
              name={actor.name}
              profilePath={actor.profile_path}
              character={actor.character}
            />
          ))}
        </div>
        <div className={styles.section}>
          <h2 className={styles.mainSubtitle}>Synopsis</h2>
          <p className={styles.synopsis}>{movie.overview}</p>
        </div>
        {similar.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.mainSubtitle}>Similar Movies</h2>
            <div className={styles.similarList}>
              {similar.slice(0, 5).map((movie) => (
                <MovieCard key={movie.id} movie={movie} compact={true} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
