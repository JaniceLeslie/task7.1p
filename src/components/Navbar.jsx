import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">DEV@DEAKIN</span>
        <input className="search" type="text" placeholder="Search" />
      </div>
      <div className="navbar-right">
        <Link to="/post">Post</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
