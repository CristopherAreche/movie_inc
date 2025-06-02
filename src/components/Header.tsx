import { useNavigate, useLocation } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./header.module.css";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isFavoritesPage = location.pathname === "/favorites";

  if (isFavoritesPage) {
    return (
      <header className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate("/")}>
          <FaArrowLeft size={20} />
        </button>
        <h1 className={styles.header__title}>Favorites</h1>
        <button
          className={styles.header__favorites}
          onClick={() => navigate("/favorites")}
        >
          <FaHeart size={18} />
        </button>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <HiOutlineMenu size={20} />
      <h1 className={styles.header__title}>MOVIES Inc</h1>
      <button
        className={styles.header__favorites}
        onClick={() => navigate("/favorites")}
      >
        <FaHeart size={18} />
      </button>
    </header>
  );
}
