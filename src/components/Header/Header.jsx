import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Google Books Search</h1>
      <p>Search for books using the Google Books API</p>
    </header>
  );
}

