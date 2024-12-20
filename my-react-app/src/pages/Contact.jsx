// src/pages/Contact.jsx

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import api from '../api/api'; // Import your Axios instance

const Contact = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const prefilledService = queryParams.get('service') || '';

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        service: prefilledService, // Pre-fill service if available
        message: "",
        file: null, // For file attachments
    });
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            setFormData((prevState) => ({ ...prevState, file: files[0] }));
        } else {
            setFormData((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus("");

        try {
            // Prepare form data
            const data = new FormData();
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('service', formData.service);
            data.append('message', formData.message);
            if (formData.file) {
                data.append('file', formData.file);
            }

            // Send POST request to your backend
            const response = await api.post('/api/email/send', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Email sent successfully:", response.data);
            setFormData({ name: "", email: "", service: prefilledService, message: "", file: null });
            setStatus("Message sent successfully!");
        } catch (err) {
            console.error("Error sending email:", err.response?.data || err.message);
            setStatus("Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page">
            <header className="contact-page__header">
                <h1>Contact Me</h1>
                <p>Feel free to reach out by filling out the form below or call me directly!</p>
            </header>
            <main className="contact-page__main">
                <div className="contact-info">
                    <p className="contact-info__phone">
                        <strong>Phone:</strong> (904) 383-9688
                    </p>
                    <a href="tel:9043839688" className="contact-info__call-button">
                        Call Now
                    </a>
                </div>
                <form className="contact-form" onSubmit={handleSubmit}>
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
                        <label htmlFor="service">Service Interested In - Optional</label>
                        <input
                            type="text"
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            placeholder="e.g., Basic Package, Standard Package"
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
                        <label htmlFor="file">Attachment - Optional</label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            onChange={handleChange}
                            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                        />
                    </div>
                    <button type="submit" className="contact-form__submit" disabled={loading}>
                        {loading ? "Sending..." : "Send"}
                    </button>
                </form>
                {status && (
                    <p
                        className={`contact-form__status ${
                            status.includes("success") ? "success" : "error"
                        }`}
                    >
                        {status}
                    </p>
                )}
            </main>
        </div>
    );
};

export default Contact;
