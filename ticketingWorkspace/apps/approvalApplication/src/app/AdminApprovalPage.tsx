import React, { useEffect, useState } from 'react';
import styles from './AdminApprovalPage.module.scss';

interface Ticket {
  id: number;
  name: string;
  date: string;
  event: string;  
  status: string;
};

const AdminApprovalPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch pending tickets from backend
  const fetchPendingTickets = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/tickets?status=pending');
      if (!response.ok) throw new Error('Failed to fetch tickets');
      const data = await response.json();
      setTickets(data);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPendingTickets();
  }, []);

  // Approve ticket handler
  const approveTicket = async (ticketId: number) => {
    try {
      const ticketToUpdate = tickets.find(t => t.id === ticketId);
      const updatedTicket = { ...ticketToUpdate, status: 'approved' };
      const response = await fetch(`http://localhost:3000/api/tickets/${ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTicket),
      });
      if (!response.ok) throw new Error('Failed to approve ticket');
      fetchPendingTickets(); // Refresh list after approval
    } catch (err:any) {
      alert(err.message);
    }
  };

  return (
    
  <div className={styles['page-container']}>
    <h1>Pending Ticket Approvals 🎟️</h1>

    {loading && <p>Loading tickets...</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}
    {tickets.length === 0 && !loading && <p>No pending approvals</p>}

    {tickets.length > 0 && (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>User Name</th>
            <th>Date</th>
            <th>Event</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>#{ticket.id}</td>
              <td>{ticket.name}</td>
              <td>{ticket.date}</td>
              <td>{ticket.event}</td>
              <td
                className={
                  ticket.status === 'pending'
                    ? styles['status-pending']
                    : styles['status-approved']
                }
              >
                {ticket.status}
              </td>
              <td>
                <button
                  className={styles['button-approve']}
                  onClick={() => approveTicket(ticket.id)}
                >
                  Approve ✅
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);  
};

export default AdminApprovalPage;
