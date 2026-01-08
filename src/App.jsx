import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import SearchForm from "./components/SearchForm/SearchForm";
import BookGrid from "./components/BookGrid/BookGrid";
import BookModal from "./components/BookModal/BookModal";
import Pagination from "./components/Pagination/Pagination";
import searchBooks from "./API/google-books";

export default function App() {
  const PAGE_SIZE = 12;

  const [books, setBooks] = useState([]);
  const [lastQuery, setLastQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedBook, setSelectedBook] = useState(null);

  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchPage = async (query, nextPage) => {
    const startIndex = (nextPage - 1) * PAGE_SIZE;

    setLoading(true);
    setError("");

    try {
      const { items, totalItems } = await searchBooks(query, startIndex, PAGE_SIZE);
      setBooks(items);
      setTotalItems(totalItems);
    } catch (e) {
      setBooks([]);
      setTotalItems(0);
      setError("Could not fetch books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    const trimmed = query.trim();

    setLastQuery(query);
    setSelectedBook(null);
    setPage(1);

    if (!trimmed) {
      setBooks([]);
      setTotalItems(0);
      setError("");
      return;
    }

    await fetchPage(trimmed, 1);
  };

  useEffect(() => {
    const trimmed = lastQuery.trim();
    if (!trimmed) return;
    fetchPage(trimmed, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const showNoResults =
    !loading && !error && lastQuery.trim().length > 0 && books.length === 0;

  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <>
      <Header />

      <main className="container">
        <SearchForm onSearch={handleSearch} />

        {loading && <p className="feedback">Loading books…</p>}
        {error && <p className="feedback">{error}</p>}

        {showNoResults && (
          <p className="feedback">
            No results found for <strong>{lastQuery}</strong>.
          </p>
        )}

        {!showNoResults && !error && lastQuery.trim() && (
          <Pagination
            page={page}
            totalItems={totalItems}
            pageSize={PAGE_SIZE}
            onPrev={handlePrev}
            onNext={handleNext}
            loading={loading}
          />
        )}

        <BookGrid books={books} onSelect={setSelectedBook} />

        {!showNoResults && !error && lastQuery.trim() && books.length > 0 && (
          <Pagination
            page={page}
            totalItems={totalItems}
            pageSize={PAGE_SIZE}
            onPrev={handlePrev}
            onNext={handleNext}
            loading={loading}
          />
        )}

        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      </main>
    </>
  );
}
