import React, { useState } from "react";
import api from "../api/api"; // Axios instance for API calls

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    file: null,
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData((prevState) => ({ ...prevState, file: e.target.files[0] }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    // Create FormData for file upload
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message);
    if (formData.file) {
      data.append("file", formData.file);
    }

    try {
      const response = await api.post("/api/email/send", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setFormData({ name: "", email: "", message: "", file: null });
        setStatus("Message sent successfully!");
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message);
      setStatus("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <header className="contact-page__header">
        <h1>Contact Me</h1>
        <p>Feel free to reach out by filling the form below!</p>
      </header>
      <main className="contact-page__main">
        <form
          className="contact-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="contact-form__field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
            />
          </div>
          <div className="contact-form__field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your Email Address"
            />
          </div>
          <div className="contact-form__field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your Message"
            ></textarea>
          </div>
          <div className="contact-form__field">
            <label htmlFor="file">Attachment</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              accept=".jpg,.png,.pdf,.docx" // Allow specific file types
            />
          </div>
          <button type="submit" className="contact-form__submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
        {status && <p className={`contact-form__status ${status.includes("success") ? "success" : "error"}`}>{status}</p>}
      </main>
    </div>
  );
};

export default Contact;
