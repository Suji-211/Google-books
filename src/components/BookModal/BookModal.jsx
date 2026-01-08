import { useEffect } from "react";
import styles from "./BookModal.module.scss";

export default function BookModal({ book, onClose }) {
  if (!book) return null;

  const info = book.volumeInfo || {};
  const sale = book.saleInfo || {};
  const access = book.accessInfo || {};

  const title = info.title || "Untitled";
  const authors = info.authors ? info.authors.join(", ") : "Unknown author";
  const description = info.description || "No description available.";
  const publisher = info.publisher || "Unknown publisher";
  const publishedDate = info.publishedDate || "Unknown date";
  const pageCount = info.pageCount || "Unknown";
  const categories = info.categories ? info.categories.join(", ") : "N/A";
  const language = info.language ? info.language.toUpperCase() : "N/A";

  const thumbnail =
    info.imageLinks?.thumbnail ||
    info.imageLinks?.smallThumbnail ||
    "https://via.placeholder.com/128x192?text=No+Cover";

  const previewLink = info.previewLink || info.infoLink || null;
  const buyLink = sale.buyLink || null;
  const country = sale.country || access.country || "N/A";

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const stop = (e) => e.stopPropagation();

  return (
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} details`}
        onClick={stop}
      >
        <button className={styles.close} onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className={styles.content}>
          <img className={styles.thumb} src={thumbnail} alt={`${title} cover`} />

          <div className={styles.meta}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.authors}>{authors}</p>

            <div className={styles.details}>
              <p><strong>Publisher:</strong> {publisher}</p>
              <p><strong>Published:</strong> {publishedDate}</p>
              <p><strong>Pages:</strong> {pageCount}</p>
              <p><strong>Categories:</strong> {categories}</p>
              <p><strong>Language:</strong> {language}</p>
              <p><strong>Country:</strong> {country}</p>
            </div>

            <p className={styles.desc}>{description}</p>

            <div className={styles.actions}>
              {previewLink && (
                <a className={styles.link} href={previewLink} target="_blank" rel="noreferrer">
                  Preview / Info
                </a>
              )}

              {buyLink && (
                <a className={styles.link} href={buyLink} target="_blank" rel="noreferrer">
                  Buy
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
