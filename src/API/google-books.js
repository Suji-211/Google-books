const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export default async function searchBooks(query, startIndex = 0, maxResults = 12) {
  const trimmed = query.trim();

  if (!trimmed) {
    return { items: [], totalItems: 0 };
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(trimmed)}&startIndex=${startIndex}&maxResults=${maxResults}`;

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  const data = await response.json();

  return {
    items: data.items || [],
    totalItems: data.totalItems || 0,
  };
}
