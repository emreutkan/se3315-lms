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
          {isAdmin && <th>ISBN</th>}
          <th>Category</th>
          <th>Status</th>
          <th>Due Date</th>
          {isAdmin && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {books.map(b => {
          // Calculate days remaining based on due_date from API
          const dueDate = b.due_date || b.return_date; // Check for both fields to ensure compatibility
          const days = daysRemaining(dueDate);
          const cls = returnDateClass(days);

          return (
            <tr key={b.id}>
              {isAdmin && <td>{b.id}</td>}
              <td>{b.title}</td>
              <td>{b.author}</td>
              {isAdmin && <td>{b.isbn}</td>}
              <td>{b.category}</td>
              <td>
                <span className={b.available ? 'status-available' : 'status-borrowed'}>
                  {b.available ? 'Available' : b.is_overdue ? 'Overdue' : 'Borrowed'}
                </span>
              </td>
              <td className={`return-date ${cls}`}>
                {dueDate ? formatDate(dueDate) : '-'}
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

