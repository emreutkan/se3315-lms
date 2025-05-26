import React from 'react';

export default function UserTable({ users }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.username}</td>
            <td>
              <span className={`user-type-badge ${u.is_admin ? 'user-type-admin' : 'user-type-normal'}`}>
                {u.is_admin ? 'Administrator' : 'User'}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

