import React, { useEffect, useState } from 'react';

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
      const response = await fetch('http://localhost:4201/tickets?status=pending');
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
      const response = await fetch(`http://localhost:4201/tickets/${ticketId}`, {
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
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Pending Ticket Approvals</h1>

      {loading && <p className="text-center text-gray-600">Loading tickets...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {tickets.length === 0 && !loading && (
        <p className="text-center text-gray-700">No pending approvals</p>
      )}

      <div className="max-w-4xl mx-auto space-y-4">
        {tickets.map(ticket => (
          <div
            key={ticket.id}
            className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-lg text-gray-900">Ticket #{ticket.id}</p>
              <p className="text-sm text-gray-500">User ID: {ticket.name}</p>
              <p className="text-gray-700">Date: {ticket.date}</p>              
              <p className="text-sm text-gray-500">Event: {ticket.event}</p>
              <p className="text-sm text-gray-500">Status: {ticket.status}</p>
            </div>
            <button
              onClick={() => approveTicket(ticket.id)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminApprovalPage;
