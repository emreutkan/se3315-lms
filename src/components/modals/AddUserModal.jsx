import React, { useState } from 'react';
import { addUser } from '../../api/users';

export default function AddUserModal({ token, onAdded, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await addUser(token, { username, password, is_admin: isAdmin });
      onAdded();
      onClose();
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Error occurred while adding the user.');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h3>Add New User</h3>
          <button className="close-modal" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-content">
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="newUsername">Username:</label>
            <input
              id="newUsername"
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">Password:</label>
            <input
              id="newPassword"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <label htmlFor="isAdmin">Administrator?</label>
            <input
              id="isAdmin"
              type="checkbox"
              checked={isAdmin}
              onChange={e => setIsAdmin(e.target.checked)}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-btn modal-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="modal-btn modal-btn-primary" onClick={handleSubmit}>Add User</button>
        </div>
      </div>
    </div>
  );
}

