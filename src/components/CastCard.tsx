import styles from "./castCard.module.css";

type Props = {
  name: string;
  profilePath: string | null;
  character: string;
};

export default function CastCard({ name, character, profilePath }: Props) {
  const imageUrl = profilePath
    ? `https://image.tmdb.org/t/p/w185${profilePath}`
    : "https://via.placeholder.com/80x100?text=No+Image";

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={name} className={styles.cardImage} />
      <div className={styles.cardInfo}>
        <p className={styles.cardName}>{name}</p>
        <p className={styles.cardCharacterName}>{character}</p>
      </div>
    </div>
  );
}
