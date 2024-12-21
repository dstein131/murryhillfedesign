import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../api/api'; // Axios instance
import './DirectMessagingPage.css';

const DirectMessagingPage = () => {
  const [phoneNumber, setPhoneNumber] = useState(''); // For unauthenticated users
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch message history on component mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/api/messages/history');
        setHistory(response.data.history || []);
      } catch {
        // No error message for missing history or unauthenticated users
        setHistory([]);
      }
    };

    fetchHistory();
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      setError('Message cannot be empty.');
      return;
    }

    if (!phoneNumber.trim()) {
      setError('Phone number is required.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/api/messages/send', { phoneNumber, message });
      setHistory((prev) => [
        ...prev,
        { sender: phoneNumber, messageContent: message, createdAt: new Date().toISOString() },
      ]);
      setMessage('');
      setSuccess('Your message has been sent!');
    } catch {
      setError('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="direct-messaging-page">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Direct Messaging | Murray Hill Web Development</title>
        <meta
          name="description"
          content="Send us a message directly and we'll respond to you as soon as possible."
        />
      </Helmet>

      <header className="direct-messaging-page__header">
        <h1>Contact Us</h1>
        <p>Send us a direct message, and we’ll get back to you promptly.</p>
      </header>

      <main className="direct-messaging-page__main">
        <div className="direct-messaging-page__chatbox">
          <div className="direct-messaging-page__history">
            {history.length === 0 ? (
              <p className="direct-messaging-page__empty">No messages yet. Start the conversation!</p>
            ) : (
              history.map((entry, index) => (
                <div key={index} className="direct-messaging-page__entry">
                  <p className="direct-messaging-page__user">
                    {entry.sender || 'You'}: {entry.messageContent}
                  </p>
                  <small className="direct-messaging-page__timestamp">
                    {new Date(entry.createdAt).toLocaleString()}
                  </small>
                </div>
              ))
            )}
          </div>

          {error && <p className="direct-messaging-page__error">{error}</p>}
          {success && <p className="direct-messaging-page__success">{success}</p>}

          <div className="direct-messaging-page__form">
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="direct-messaging-page__input"
            />
            <textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="direct-messaging-page__textarea"
              rows="4"
            ></textarea>
            <button
              className="direct-messaging-page__send"
              onClick={handleSendMessage}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DirectMessagingPage;
