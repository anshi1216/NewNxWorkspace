import React, { useEffect, useState } from 'react';

interface Ticket {
  id: number;
  name: string;
  date: string;
  event: string;
  status: string;
}

const AdminApprovalPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const approveTicket = async (ticketId: number) => {
    try {
      const ticketToUpdate = tickets.find(t => t.id === ticketId);
      if (!ticketToUpdate) return;
      const updatedTicket = { ...ticketToUpdate, status: 'approved' };
      const response = await fetch(`http://localhost:3000/api/tickets/${ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTicket),
      });
      if (!response.ok) throw new Error('Failed to approve ticket');
      fetchPendingTickets();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-white p-10 min-h-[55vh] font-sans text-blue-700">
      <h1 className="text-3xl font-bold mb-8">Pending Ticket Approvals 🎟️</h1>

      {loading && <p className="text-center text-gray-600">Loading tickets...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && tickets.length === 0 && (
        <p className="text-center text-gray-600">No pending approvals</p>
      )}

      {tickets.length > 0 && (
        <table className="w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <thead className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Ticket ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">User Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Event</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr
                key={ticket.id}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="px-6 py-4 font-medium text-indigo-700">#{ticket.id}</td>
                <td className="px-6 py-4">{ticket.name}</td>
                <td className="px-6 py-4">{ticket.date}</td>
                <td className="px-6 py-4">{ticket.event}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      ticket.status === 'pending'
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-green-200 text-green-800'
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => approveTicket(ticket.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-green-500 transition"
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
