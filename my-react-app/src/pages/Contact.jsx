import React, { useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    // Debug: Log environment variables
    console.log("Service ID:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
    console.log("Template ID:", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
    console.log("Public Key:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

    // Send data using EmailJS
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, // EmailJS Service ID
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // EmailJS Template ID
        formData, // Form data
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY // Public Key
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          setFormData({ name: "", email: "", message: "" });
          setStatus("Message sent successfully!");
        },
        (error) => {
          console.error("Error sending email:", error.text);
          setStatus("Failed to send message. Please try again.");
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="contact-page">
      <header className="contact-page__header">
        <h1>Contact Me</h1>
        <p>Feel free to reach out by filling out the form below!</p>
      </header>
      <main className="contact-page__main">
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
