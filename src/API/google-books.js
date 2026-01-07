const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export default async function searchBooks(query) {
  const trimmed = query.trim();

  // If the user submits empty input, return no results
  if (!trimmed) return [];

  const url = `${BASE_URL}?q=${encodeURIComponent(trimmed)}&maxResults=12`;

  const response = await fetch(url);

  // If the request fails, throw an error so App.jsx can handle it
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  const data = await response.json();

  // items can be undefined, so fallback to empty array
  return data.items || [];
}
