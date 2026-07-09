import { Link } from "react-router-dom";
import "./Homepage.css";

function HomePage() {
  return (
    <div className="home-container">

      <div className="home-card">

        <h1>📚 Library Management System</h1>

        <p>
          Welcome to the Library Management System.
          Please sign in if you already have an account,
          or create a new account to continue.
        </p>

        <div className="home-buttons">

          <Link to="/signin">
            <button className="login-btn">
              Sign In
            </button>
          </Link>

          <Link to="/signup">
            <button className="signup-btn">
              Create Account
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default HomePage;