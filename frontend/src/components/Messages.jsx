import React, { useState, useEffect } from 'react';
import MailDetail from './MailDetail';
import { MdDeleteOutline, MdOutlineMarkEmailRead } from 'react-icons/md';

// Backend se emails fetch karne ke liye
const fetchEmails = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emails`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) return [];
  return await res.json();
};

const tabNames = ["Primary", "Social", "Promotions"];
const SIDEBAR_TABS = {
  INBOX: 0,
  STARRED: 1,
  SENT: 3,
};

const Messages = ({ refreshKey, selectedTab }) => {
  const [emails, setEmails] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const [openMail, setOpenMail] = useState(null);

  const userEmail = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).email;

  useEffect(() => {
    fetchEmails().then(setEmails);
  }, [refreshKey]);

  // Inbox, Starred, Sent filtering
  let filtered = emails;
  if (selectedTab === SIDEBAR_TABS.INBOX) {
    filtered = emails.filter(email => email.to === userEmail);
  } else if (selectedTab === SIDEBAR_TABS.STARRED) {
    filtered = emails.filter(email => email.starred && (email.to === userEmail || email.from === userEmail));
  } else if (selectedTab === SIDEBAR_TABS.SENT) {
    filtered = emails.filter(email => email.from === userEmail);
  }


  // Checkbox state
  const [checkedIds, setCheckedIds] = useState([]);
  const handleCheckbox = (id) => {
    setCheckedIds(ids => ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id]);
  };

  // Tab filtering logic
  let filterEmail = filtered;
  if (activeTab === 1) {
    filterEmail = filtered.filter(e => e.subject?.toLowerCase().includes('social'));
  } else if (activeTab === 2) {
    filterEmail = filtered.filter(e => e.subject?.toLowerCase().includes('promo'));
  }

  // Mark as read
  const handleMarkAsRead = async (id) => {
    const token = localStorage.getItem('token');
    import.meta.env.VITE_BACKEND_URL
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emails/${id}/read`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setEmails(emails => emails.map(m => m._id === id ? { ...m, read: true } : m));
  };

  // Delete
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emails/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setEmails(emails => emails.filter(m => m._id !== id));
  };

  // Mail detail screen
  if (openMail) {
    return (
      <div className="w-full">
        <MailDetail email={openMail} onClose={() => setOpenMail(null)} />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex bg-[#f5f7fa] rounded-t-lg shadow-sm sticky top-0 z-10" style={{ width: '48%', marginLeft: 0 }}>
        {tabNames.map((name, idx) => (
          <button
            key={name}
            className={`relative flex-1 py-[13px] text-sm font-medium focus:outline-none transition-colors duration-200
              ${activeTab === idx
                ? 'text-[#1a73e8] bg-white shadow-sm'
                : 'text-gray-600 bg-transparent hover:bg-gray-100'}
              rounded-t-lg
            `}
            style={{
              borderBottom: activeTab === idx ? '3px solid #1a73e8' : '3px solid transparent',
              zIndex: activeTab === idx ? 2 : 1
            }}
            onClick={() => setActiveTab(idx)}
          >
            <span className="flex items-center justify-center gap-2">
              {name}
              {activeTab === idx && (
                <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2 h-2 bg-[#1a73e8] rounded-full"></span>
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Email list */}
      {filterEmail.map((email) => {
        const checked = checkedIds.includes(email._id);
        return (
          <div
            key={email._id}
            className={`flex items-start justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:bg-gray-50 group ${checked ? 'bg-blue-50' : ''}`}
            onMouseEnter={() => setHoveredId(email._id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setOpenMail(email)}
          >
            <div className="flex items-center gap-3">
              {/* Checkbox */}
              <div className="flex-none text-gray-300">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={checked}
                  onChange={e => {
                    e.stopPropagation();
                    handleCheckbox(email._id);
                  }}
                  onClick={e => e.stopPropagation()}
                />
              </div>

              <div>
                <h1 className={email.read ? '' : 'font-semibold'}>{email?.from}</h1>
              </div>
            </div>
            <div className="flex-1 ml-4">
              <p className="text-gray-600 truncate inline-block max-w-full">
                {email.body?.length > 130 ? `${email?.body.substring(0, 130)}...` : email.body}
              </p>
            </div>
            {/* Hover actions: show if hovered or checked */}
            {(hoveredId === email._id || checked) ? (
              <div className="flex-none text-gray-400 text-sm flex items-center gap-2" onClick={e => e.stopPropagation()}>
                <button
                  className="hover:bg-gray-100 p-1 rounded"
                  title="Mark as Read"
                  onClick={e => {
                    e.stopPropagation();
                    handleMarkAsRead(email._id);
                  }}
                  disabled={email.read}
                >
                  <MdOutlineMarkEmailRead size={20} className={email.read ? 'text-green-400' : ''} />
                </button>
                <button
                  className="hover:bg-red-100 p-1 rounded text-red-500"
                  title="Delete"
                  onClick={e => {
                    e.stopPropagation();
                    handleDelete(email._id);
                  }}
                >
                  <MdDeleteOutline size={20} />
                </button>
              </div>
            ) : (
              <div className="flex-none text-gray-400 text-xs ml-2 min-w-[120px] text-right">
                {email?.createdAt ? new Date(email.createdAt).toLocaleString() : ''}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
