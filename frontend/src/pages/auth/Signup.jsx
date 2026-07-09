import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import API from "../../API/api";

function Signup() {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (
      !fullname ||
      !phoneNumber ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/signup", {
        fullname,
        phoneNumber,
        email,
        password,
      });

      alert(res.data.message);

      setFullname("");
      setPhoneNumber("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/signin");

    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">

      <div className="signup-card">

        <h1>Create Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="bottom-link">
          Already have an account?{" "}
          <Link to="/signin">Sign In</Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;