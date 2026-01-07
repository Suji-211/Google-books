import { useState } from "react";
import styles from "./SearchForm.module.scss";

export default function SearchForm({ onSearch }) {
  // Stores whatever the user types
  const [value, setValue] = useState("");

  // Runs when user clicks Search (submits form)
  const handleSubmit = (e) => {
    e.preventDefault();     // stops page refresh
    onSearch(value);        // sends the value up to App.jsx
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)} // update state while typing
        placeholder="Search by title, author, keyword..."
      />
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  );
}
