import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="Header ">
        <div className="logo">Library Management System</div>

        {/* <nav className="nav-links">
          <Link to="/" >Home</Link>
          <Link to="/">Books</Link>
          <Link to="/">contact us</Link>
          <Link to="/">about us</Link>
        </nav> */}

        <div className="auth">
          <Link to="/">signin</Link>
          <Link to="/">signup</Link>
        </div>
      </header>
    </>
  );
};
export default Header;
