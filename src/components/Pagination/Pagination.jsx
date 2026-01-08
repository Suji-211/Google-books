import styles from "./Pagination.module.scss";

export default function Pagination({
  page,
  totalItems,
  pageSize,
  onPrev,
  onNext,
  loading,
}) {
  if (totalItems <= 0) return null;

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  return (
    <div className={styles.pagination} aria-label="Pagination controls">
      <button
        className={styles.button}
        onClick={onPrev}
        disabled={loading || isFirst}
        type="button"
      >
        Prev
      </button>

      <span className={styles.info}>
        Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        <span className={styles.muted}> · {totalItems} results</span>
      </span>

      <button
        className={styles.button}
        onClick={onNext}
        disabled={loading || isLast}
        type="button"
      >
        Next
      </button>
    </div>
  );
}
