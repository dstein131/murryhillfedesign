import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', file: null });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] }); // Capture the uploaded file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to handle file upload
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('message', formData.message);
    if (formData.file) {
      data.append('file', formData.file);
    }

    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        body: data, // Send FormData
      });

      if (response.ok) {
        setFormData({ name: '', email: '', message: '', file: null });
        setStatus('Message sent successfully!');
      } else {
        setStatus('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="contact-page">
      <header className="contact-page__header">
        <h1>Contact Me</h1>
        <p>Feel free to reach out by filling the form below!</p>
      </header>
      <main className="contact-page__main">
        <form className="contact-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="contact-form__field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
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
            ></textarea>
          </div>
          <div className="contact-form__field">
            <label htmlFor="file">Attachment</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              accept=".jpg,.png,.pdf,.docx" // Limit file types for security
            />
          </div>
          <button type="submit" className="contact-form__submit">
            Send
          </button>
        </form>
        {status && <p className="contact-form__status">{status}</p>}
      </main>
    </div>
  );
};

export default Contact;
