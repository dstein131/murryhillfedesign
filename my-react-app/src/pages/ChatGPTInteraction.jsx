import React, { useState, useEffect, useRef } from "react";
import api from "../api/api"; // Import the API instance
import "./ChatGPTInteraction.css"; // Import CSS for styling

const ChatGPTInteraction = () => {
  const [messages, setMessages] = useState([]); // State to store conversation
  const [input, setInput] = useState(""); // State for user input
  const [loading, setLoading] = useState(false); // State to indicate if a response is being fetched
  const [error, setError] = useState(null); // State to handle errors
  const messagesEndRef = useRef(null); // Ref for auto-scrolling

  // Function to send a message to the backend and get a response
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user's message to the conversation
    const userMessage = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    setError(null);
    setInput(""); // Clear input field

    try {
      // Send the message to the backend
      const response = await api.post("/api/chatgpt/respond", {
        message: input.trim(),
      });

      // Add ChatGPT's response to the conversation
      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error fetching response:", err);
      if (err.response?.status === 401) {
        setError("Unauthorized access. Please log in.");
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Failed to fetch response. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to the bottom of the messages container
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to handle input changes
  const handleInputChange = (e) => setInput(e.target.value);

  // Function to handle pressing Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chatgpt-container">
      <div className="chatgpt-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatgpt-message ${
              msg.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="chatgpt-message bot-message">Typing...</div>}
        <div ref={messagesEndRef} /> {/* Auto-scroll target */}
      </div>
      {error && <div className="chatgpt-error">{error}</div>}
      <div className="chatgpt-input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={loading}
          className="chatgpt-input"
        />
        <button
          onClick={handleSendMessage}
          disabled={loading || !input.trim()}
          className="chatgpt-send-button"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatGPTInteraction;
