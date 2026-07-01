import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import WrathcodeIcon from "../../Icon/WrathcodeIcon.png";
import { IoPersonCircleOutline } from "react-icons/io5";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!(token || user));
  }, [location.pathname]);

  const handleLogin = () => {
    navigate("/Login");
  };

  const handleSignUp = () => {
    navigate("/SignUp")
  };

  const handleProfileClick = () => {
    navigate("/Dashboard");
  };

  return (
    <header className="header">
      <div className="logo-section">
        <div className="logo-icon">
          <img src={WrathcodeIcon} alt="logo" />
        </div>
        <h2>WRATHCODE</h2>
      </div>

      <nav className="nav-links">
        <Link to="/Landing">Home</Link>
        <Link to="/">Market</Link>
        <div className="dropdown">
          <Link to="/">Trade ▼</Link>
        </div>
        <a href="/SpotTrade">SpotTrade ▼</a>
        <a href="/">Earning</a>
        <a href="/">Quick Swap </a>
        <a href="/">Launchpad ▼</a>
        <a href="/">Meme+</a>
        <a href="/">Blogs & News</a>
      </nav>

      <div className="auth-buttons">
        {isLoggedIn ? (
          <div onClick={handleProfileClick} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
            <IoPersonCircleOutline size={32} color="#fff" />
          </div>
        ) : (
          <>
            <button onClick={handleLogin} className="login-btn">Log In</button>
            <button onClick={handleSignUp} className="signup-btn">Sign Up</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;