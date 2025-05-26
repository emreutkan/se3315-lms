import React, { useState, useEffect, useContext } from 'react';
import DashboardLayout from './DashboardLayout';
import BookTable from './BookTable';
import UserTable from './UserTable';
// Fix import paths for modal components
import AddUserModal from '../components/modals/AddUserModal';
import AddBookModal from '../components/modals/AddBookModal';
import AssignBookModal from '../components/modals/AssignBookModal';
import { listBooks, returnBook as apiReturn } from '../api/books';
import { listUsers } from '../api/users';
import { AuthContext } from '../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);
  const [assignBook, setAssignBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [filter, setFilter] = useState({ term: '', type: 'title' });
  const [userSearch, setUserSearch] = useState('');

  const fetchAll = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [booksRes, usersRes] = await Promise.all([
        listBooks(user.token),
        listUsers(user.token)
      ]);
      setBooks(booksRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error loading data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [user.token]);

  const handleReturn = async id => {
    try {
      await apiReturn(user.token, id);
      showMessage('success', 'Book successfully returned.');
      await fetchAll();
    } catch (err) {
      console.error('Error returning book:', err);
      showMessage('error', 'Error returning the book.');
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 3000);
  };

  // Filter books based on search criteria
  const filteredBooks = books.filter(b =>
    !filter.term ||
    (filter.type === 'title' && b.title.toLowerCase().includes(filter.term.toLowerCase())) ||
    (filter.type === 'isbn' && b.isbn && b.isbn.toLowerCase().includes(filter.term.toLowerCase())) ||
    (filter.type === 'category' && b.category.toLowerCase().includes(filter.term.toLowerCase())) ||
    (filter.type === 'author' && b.author.toLowerCase().includes(filter.term.toLowerCase()))
  );

  // Filter users based on search
  const filteredUsers = users.filter(u =>
    !userSearch ||
    u.username.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="admin-actions">
        <button onClick={() => setShowAddUser(true)}>Add New User</button>
        <button onClick={() => setShowAddBook(true)}>Add New Book</button>
      </div>

      {/* Admin Message Display */}
      {message.text && (
        <div className={message.type === 'error' ? 'error-message' : 'success-message'}>
          {message.text}
        </div>
      )}

      {/* Search section */}
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

      <div className="data-tables">
        <div className="users-table-container">
          <div className="table-header">
            <h3>Users</h3>
            <div className="search-inputs">
              <input
                type="text"
                placeholder="Search users..."
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
              />
            </div>
          </div>
          {!isLoading && !error && <UserTable users={filteredUsers} />}
        </div>

        <div className="books-table-container">
          <h3>Books</h3>
          {!isLoading && !error && (
            <BookTable
              books={filteredBooks}
              isAdmin
              onAssign={b => setAssignBook(b)}
              onReturn={handleReturn}
            />
          )}
        </div>
      </div>

      {showAddUser && (
        <AddUserModal
          token={user.token}
          onAdded={() => {
            fetchAll();
            showMessage('success', 'User successfully added.');
          }}
          onClose={() => setShowAddUser(false)}
        />
      )}

      {showAddBook && (
        <AddBookModal
          token={user.token}
          onAdded={() => {
            fetchAll();
            showMessage('success', 'Book successfully added.');
          }}
          onClose={() => setShowAddBook(false)}
        />
      )}

      {assignBook && (
        <AssignBookModal
          token={user.token}
          book={assignBook}
          users={users.filter(u => !u.is_admin)} // Only show non-admin users
          onAssigned={() => {
            setAssignBook(null);
            fetchAll();
            showMessage('success', 'Book successfully assigned.');
          }}
          onClose={() => setAssignBook(null)}
        />
      )}
    </DashboardLayout>
  );
}

