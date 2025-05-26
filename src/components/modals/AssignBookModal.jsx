import React, { useState, useEffect, useRef } from 'react';
import { assignBook } from '../../api/books';
import { formatDate } from '../../utils/date';

export default function AssignBookModal({ token, book, users, onAssigned, onClose }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [days, setDays] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [userSearch, setUserSearch] = useState('');
  const [error, setError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (days != null) {
      const d = new Date();
      d.setDate(d.getDate() + days);
      setReturnDate(d.toISOString());
    }
  }, [days]);

  const handleAssign = async () => {
    if (!selectedUser || !returnDate) {
      setError('Please select a user and return date.');
      return;
    }

    try {
      await assignBook(token, book.id, selectedUser, returnDate);
      onAssigned();
    } catch (error) {
      console.error('Error assigning book:', error);
      setError('Error occurred while assigning the book.');
    }
  };

  // Filter users based on search input
  const filteredUsers = users.filter(user =>
    !userSearch || user.username.toLowerCase().includes(userSearch.toLowerCase())
  );

  // Function to handle user selection
  const handleUserSelect = (user) => {
    setSelectedUser(user.id);
    setUserSearch(user.username);
    setIsDropdownOpen(false);
  };

  // Get selected user's name for display
  const selectedUserName = selectedUser
    ? users.find(u => u.id === selectedUser)?.username
    : '';

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h3>Assign Book</h3>
          <button className="close-modal" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-content">
          {error && <div className="error-message">{error}</div>}

          <p id="selectedBookInfo" className="form-group">
            Book: {book.title} - {book.author}
          </p>

          <div className="form-group">
            <label>Loan Duration:</label>
            <div className="date-options">
              <button
                type="button"
                className={`date-option-btn ${days === 7 ? 'active' : ''}`}
                onClick={() => setDays(7)}
              >
                7 Days
              </button>
              <button
                type="button"
                className={`date-option-btn ${days === 15 ? 'active' : ''}`}
                onClick={() => setDays(15)}
              >
                15 Days
              </button>
              <button
                type="button"
                className={`date-option-btn ${days === 30 ? 'active' : ''}`}
                onClick={() => setDays(30)}
              >
                1 Month
              </button>
            </div>
          </div>

          {returnDate && (
            <div className="selected-date">
              Return Date: {formatDate(returnDate)}
            </div>
          )}

          <div className="form-group" style={{ position: 'relative' }}>
            <label htmlFor="userSearchModal">Search User:</label>
            <input
              id="userSearchModal"
              type="text"
              ref={searchInputRef}
              placeholder="Type username..."
              value={userSearch}
              onChange={e => {
                setUserSearch(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
            />
            {selectedUser && (
              <div className="selected-user">
                Selected: <strong>{selectedUserName}</strong>
              </div>
            )}
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="user-dropdown"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  maxHeight: '200px',
                  overflowY: 'auto',
                  backgroundColor: 'white',
                  border: '1px solid var(--gray-300)',
                  borderRadius: 'var(--border-radius)',
                  zIndex: 10,
                  boxShadow: 'var(--box-shadow)'
                }}
              >
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <div
                      key={user.id}
                      className={`user-dropdown-item ${selectedUser === user.id ? 'active' : ''}`}
                      onClick={() => handleUserSelect(user)}
                      style={{
                        padding: '10px 15px',
                        cursor: 'pointer',
                        borderBottom: '1px solid var(--gray-200)',
                        backgroundColor: selectedUser === user.id ? 'rgba(67, 97, 238, 0.1)' : 'transparent'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(67, 97, 238, 0.05)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor =
                          selectedUser === user.id ? 'rgba(67, 97, 238, 0.1)' : 'transparent';
                      }}
                    >
                      {user.username}
                    </div>
                  ))
                ) : (
                  <div className="user-dropdown-item" style={{ padding: '10px 15px' }}>
                    No users found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-btn modal-btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className="modal-btn modal-btn-primary"
            onClick={handleAssign}
            disabled={!selectedUser || !returnDate}
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}

