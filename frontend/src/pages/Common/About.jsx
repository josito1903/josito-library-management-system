import "./About.css";

function About() {
  return (
    <div className="about-container">

      <h1>About Library Management System</h1>

      <p>
        The Library Management System is a web application designed to
        simplify library operations. It allows librarians to manage books,
        students, and borrowing records efficiently.
      </p>

      <h2>Features</h2>

      <ul>
        <li>📚 Book Management</li>
        <li>👨‍🎓 Student Management</li>
        <li>📖 Borrow & Return Books</li>
        <li>🔒 Secure Login System</li>
        <li>👤 User Profile</li>
        <li>📊 Dashboard Statistics</li>
      </ul>

      <h2>Developer</h2>

      <p><strong>Name:</strong> Josito Mendes</p>
      <p><strong>Course:</strong> BCA</p>
      <p><strong>College:</strong> PCTE Ludhiana</p>

    </div>
  );
}

export default About;