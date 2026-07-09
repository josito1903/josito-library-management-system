import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          textAlign: "center",
          background: "#fff",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 5px 20px rgba(0,0,0,.15)",
        }}
      >
        <h1
          style={{
            fontSize: "80px",
            color: "#1976d2",
            margin: 0,
          }}
        >
          404
        </h1>

        <h2>Page Not Found</h2>

        <p>
          Sorry, the page you are looking for does not exist.
        </p>

        <Link
          to="/"
          style={{
            display: "inline-block",
            marginTop: "20px",
            padding: "10px 25px",
            background: "#1976d2",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "6px",
          }}
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;