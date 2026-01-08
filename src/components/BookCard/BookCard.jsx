import styles from "./BookCard.module.scss";

export default function BookCard({ book, onSelect }) {
  const info = book.volumeInfo || {};

  const title = info.title || "Untitled";
  const authors = info.authors ? info.authors.join(", ") : "Unknown author";
  const description = info.description || "No description available.";

  const thumbnail =
    info.imageLinks?.thumbnail ||
    info.imageLinks?.smallThumbnail ||
    "https://via.placeholder.com/128x192?text=No+Cover";

    const handleClick = () => onSelect?.(book);

  return (
    <article className={styles.card}  
     onClick={handleClick}
     role="button"
     tabIndex={0}
     onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
      aria-label={`Open details for ${title}`}
    >
      <img className={styles.thumb} src={thumbnail} alt={title} />

      <div className={styles.meta}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>{authors}</p>
        <p className={styles.desc}>{description}</p>
      </div>
    </article>
  );
}
