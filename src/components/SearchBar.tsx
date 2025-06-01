import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";
import { useSearch } from "../provider/SearchContext";
export default function SearchBar() {
  const { query, setQuery } = useSearch();

  return (
    <div className={styles.search}>
      <FaSearch className={styles.search__icon} />
      <input
        type="text"
        className={styles.search__input}
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
