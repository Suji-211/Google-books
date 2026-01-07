import { useState } from "react";
import Header from "./components/Header/Header";
import SearchForm from "./components/SearchForm/SearchForm";
import BookGrid from "./components/BookGrid/BookGrid";
import searchBooks from "./API/google-books";


export default function App() {
  const [books, setBooks] = useState([]);
  const [lastQuery, setLastQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query) => {
    setLastQuery(query);
    setLoading(true);
    setError("");

    try {
      const results = await searchBooks(query);
      setBooks(results);
    } catch (e) {
      setBooks([]);
      setError("Could not fetch books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const showNoResults =
    !loading && !error && lastQuery.trim().length > 0 && books.length === 0;

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

        <BookGrid books={books} />

      </main>
    </>
  );
}
