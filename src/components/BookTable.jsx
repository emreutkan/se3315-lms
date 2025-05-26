import React from 'react';
import { formatDate, daysRemaining, returnDateClass } from '../utils/date';

export default function BookTable({ books, onAssign, onReturn, isAdmin }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          {isAdmin && <th>ID</th>}
          <th>Book Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Status</th>
          <th>Return Date</th>
          {isAdmin && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {books.map(b => {
          const days = daysRemaining(b.return_date);
          const cls = returnDateClass(days);
          return (
            <tr key={b.id}>
              {isAdmin && <td>{b.id}</td>}
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.category}</td>
              <td>
                <span className={b.available ? 'status-available' : 'status-borrowed'}>
                  {b.available ? 'Available' : 'Borrowed'}
                </span>
              </td>
              <td className={`return-date ${cls}`}>
                {b.return_date ? formatDate(b.return_date) : '-'}
              </td>
              {isAdmin && (
                <td>
                  {b.available
                    ? <button className="action-btn" onClick={()=>onAssign(b)}>Assign</button>
                    : <button className="action-btn" onClick={()=>onReturn(b.id)}>Return</button>
                  }
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

