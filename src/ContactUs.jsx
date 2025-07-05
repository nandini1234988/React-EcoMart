import { useState } from 'react';
import './ContactUs.css';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your logic here: e.g., send to server or show a success message
    console.log('Form submitted:', formData);
    setSubmitted(true);

    // Clear the form
    setFormData({
      firstName: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-left">
        <h1>Contact EcoMart</h1>
        <p>
          Get in touch with us for inquiries about our fresh grocery items and online delivery services. We're here to help you!
        </p>
        {submitted && <p className="success-message">Thank you! Your message has been sent.</p>}
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Your First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={handleChange}
        />

        <label>Your Email Address<span className="required">*</span></label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <label>Your Message<span className="required">*</span></label>
        <textarea
          name="message"
          placeholder="Type your message here"
          required
          value={formData.message}
          onChange={handleChange}
        />

        <button type="submit">Submit Your Inquiry</button>
      </form>
    </div>
  );
}
