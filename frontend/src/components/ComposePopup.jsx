import React, { useState } from 'react';

const ComposePopup = ({ onClose, onSend }) => {
  const [form, setForm] = useState({ to: '', subject: '', body: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send email');
      onSend();
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed bottom-6 right-8 z-50">
      <div className="bg-white w-[400px] rounded-lg shadow-2xl border border-gray-300 relative flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-t-lg border-b">
          <span className="font-semibold text-gray-700">New Message</span>
          <button onClick={onClose} className="text-gray-500 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col px-4 py-2">
          <input name="to" value={form.to} onChange={handleChange} placeholder="To" className="mb-2 p-2 border-b border-gray-200 focus:outline-none" required />
          <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="mb-2 p-2 border-b border-gray-200 focus:outline-none" required />
          <textarea name="body" value={form.body} onChange={handleChange} placeholder="Message" className="mb-2 p-2 border-b border-gray-200 focus:outline-none resize-none" rows={6} required />
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <div className="flex items-center justify-between mt-2">
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-full shadow hover:bg-blue-600">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComposePopup;
