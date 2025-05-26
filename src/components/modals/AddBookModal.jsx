import React, { useState } from 'react';
import { addBook } from '../../api/books';

export default function AddBookModal({ token, onAdded, onClose }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!title || !author || !isbn || !category) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await addBook(token, { title, author, isbn, category });
      onAdded();
      onClose();
    } catch (error) {
      console.error('Error adding book:', error);
      setError('Error occurred while adding the book.');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h3>Add New Book</h3>
          <button className="close-modal" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-content">
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="bookTitle">Book Title:</label>
            <input
              id="bookTitle"
              type="text"
              placeholder="Book Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bookAuthor">Author:</label>
            <input
              id="bookAuthor"
              type="text"
              placeholder="Author"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bookIsbn">ISBN:</label>
            <input
              id="bookIsbn"
              type="text"
              placeholder="ISBN"
              value={isbn}
              onChange={e => setIsbn(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bookCategory">Category:</label>
            <input
              id="bookCategory"
              type="text"
              placeholder="Category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-btn modal-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="modal-btn modal-btn-primary" onClick={handleSubmit}>Add Book</button>
        </div>
      </div>
    </div>
  );
}

