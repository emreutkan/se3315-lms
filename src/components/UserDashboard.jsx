import React, { useState, useEffect, useContext } from 'react';
import DashboardLayout from './DashboardLayout';
import BookTable from './BookTable';
import { listBooks } from '../api/books';
import { AuthContext } from '../context/AuthContext';

export default function UserDashboard() {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState({ term:'', type:'title' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await listBooks(user.token);
        setBooks(data);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Error loading books.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [user.token]);

  const filtered = books.filter(b =>
    !filter.term ||
    (filter.type === 'title' && b.title.toLowerCase().includes(filter.term.toLowerCase())) ||
    (filter.type === 'isbn' && b.isbn && b.isbn.toLowerCase().includes(filter.term.toLowerCase())) ||
    (filter.type === 'category' && b.category.toLowerCase().includes(filter.term.toLowerCase())) ||
    (filter.type === 'author' && b.author.toLowerCase().includes(filter.term.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="search-section">
        <h2>Search Books</h2>
        <div className="search-form">
          <div className="search-inputs">
            <input
              type="text"
              placeholder="Search term..."
              value={filter.term}
              onChange={e => setFilter(f => ({...f, term: e.target.value}))}
            />
            <select
              value={filter.type}
              onChange={e => setFilter(f => ({...f, type: e.target.value}))}
            >
              <option value="title">Book Title</option>
              <option value="isbn">ISBN</option>
              <option value="author">Author</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading && <div className="loading">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="books-list">
        <h3>Books</h3>
        {!isLoading && !error && (
          <BookTable books={filtered} isAdmin={false} />
        )}
      </div>
    </DashboardLayout>
  );
}

