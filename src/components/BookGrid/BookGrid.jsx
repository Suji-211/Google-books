import styles from "./BookGrid.module.scss";
import BookCard from "../BookCard/BookCard";

export default function BookGrid({ books,onSelect }) {
  return (
    <section className={styles.grid}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} onSelect={onSelect} />
      ))}
    </section>
  );
}
