import React, { useState, useEffect } from "react";

const MailDetail = ({ email, onClose }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [mailData, setMailData] = useState(email);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch latest email with replies
  const fetchMail = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emails/${email._id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMailData(data);
      }
    } catch (err) {

      console.error('Failed to fetch mail:', err);
    }
  };

  useEffect(() => {
    setMailData(email);
  }, [email]);

  // Send reply and update conversation
  const handleReplySend = async () => {
    if (!replyText.trim()) return;
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emails/${email._id}/reply`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ body: replyText })
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Failed to send reply');
        setLoading(false);
        return;
      }
      setReplyText("");
      setShowReply(false);
      setSuccess("Mail sent!");
      setTimeout(() => setSuccess(""), 2500);
      await fetchMail();
    } catch {
      setError('Failed to send reply');
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md border border-gray-200 flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="flex items-center gap-2">
          {/* Back */}
          <button
            onClick={onClose}
            className="text-gray-600 hover:bg-gray-200 rounded-full p-2 transition"
            title="Back"
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          {/* Archive */}
          <button
            className="text-gray-600 hover:bg-gray-200 rounded-full p-2 transition"
            title="Archive"
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="8" width="18" height="13" rx="2" />
              <polyline points="3 8 12 13 21 8" />
            </svg>
          </button>
          {/* Delete */}
          <button
            className="text-gray-600 hover:bg-gray-200 rounded-full p-2 transition"
            title="Delete"
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m5 0V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
        <div className="text-xs text-gray-500">
          {email.createdAt ? new Date(email.createdAt).toLocaleString() : ""}
        </div>
      </div>

      {/* Subject */}
      <div className="px-8 pt-6 pb-3 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          {email.subject}
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="#eab308"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <polygon points="12 17.27 18.18 21 15.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 8.46 13.97 5.82 21 12 17.27" />
          </svg>
        </h2>
      </div>

      {/* Sender Row */}
      <div className="flex items-start px-8 py-4 border-b border-gray-100">
        <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-lg font-bold text-blue-700 mr-3">
          {email.from?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold text-gray-900">
                {email.from}
              </span>{" "}
              <span className="text-xs text-gray-500">&lt;{email.from}&gt;</span>
            </div>
            <span className="text-xs text-gray-500">
              {email.createdAt
                ? new Date(email.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
                : ""}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            to <span className="font-medium text-gray-700">{email.to}</span>
          </div>
        </div>
      </div>


      {/* Conversation (original + replies) */}
      <div className="flex-1 overflow-y-auto px-8 pt-4 pb-6 text-gray-800 whitespace-pre-line text-[15px] leading-relaxed">
        {/* Original message */}
        <div className="mb-6">
          <div className="font-semibold text-gray-900">{mailData.from}</div>
          <div className="text-xs text-gray-500 mb-1">{mailData.createdAt ? new Date(mailData.createdAt).toLocaleString() : ""}</div>
          <div>{mailData.body}</div>
        </div>
        {/* Replies */}
        {mailData.replies && mailData.replies.length > 0 && (
          <div className="space-y-6">
            {mailData.replies.map((reply, idx) => (
              <div key={idx} className="border-l-4 border-blue-200 pl-4">
                <div className="font-semibold text-blue-700">{reply.from}</div>
                <div className="text-xs text-gray-400 mb-1">{reply.createdAt ? new Date(reply.createdAt).toLocaleString() : ""}</div>
                <div>{reply.body}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reply Section */}
      <div className="border-t border-gray-200 px-8 py-4 bg-gray-50">
        {success && <div className="text-green-600 text-sm mb-2 font-medium">{success}</div>}
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        {!showReply ? (
          <button
            onClick={() => setShowReply(true)}
            className="px-6 py-2 text-sm border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 transition shadow-sm"
          >
            ↩️ Reply
          </button>
        ) : (
          <div className="animate-fade-in">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              className="w-full h-28 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              disabled={loading}
            />
            <div className="mt-3 flex gap-2">
              <button
                className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition shadow-sm"
                onClick={handleReplySend}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
              <button
                onClick={() => setShowReply(false)}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MailDetail;
