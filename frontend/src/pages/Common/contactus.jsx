import "./Contactus.css";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

function Contact() {
  return (
    <div className="contact-container">

      <h1>Contact Us</h1>

      <div className="contact-card">

        <p>
          <FaEnvelope className="icon" />
          library@gmail.com
        </p>

        <p>
          <FaPhone className="icon" />
          +91 9876543210
        </p>

        <p>
          <FaMapMarkerAlt className="icon" />
          PCTE Ludhiana, Punjab, India
        </p>

        <p>
          <FaClock className="icon" />
          Monday - Saturday (9:00 AM - 6:00 PM)
        </p>

      </div>

      <h2>Send us a Message</h2>

      <div className="contact-form">

        <input type="text" placeholder="Your Name" />

        <input type="email" placeholder="Your Email" />

        <textarea placeholder="Write your message"></textarea>

        <button>Send Message</button>

      </div>

    </div>
  );
}

export default Contact;