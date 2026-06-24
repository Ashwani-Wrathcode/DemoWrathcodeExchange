import React from "react";
import "./Header.css";
import { useNavigate } from "react-router";
import WrathcodeIcon from "../../Icon/WrathcodeIcon.png";

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/Login");
  };

  const handleSignUp = () => {
    navigate("/SignUp")
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
        <a href="/Landing">Home</a>

        <a href="/">Market</a>
        <div className="dropdown">
          <a href="/">Trade ▼</a>
        </div>
        <a href="/">futures ▼</a>
        <a href="/">Earning</a>
        <a href="/">Quick Swap </a>
        <a href="/">Launchpad ▼</a>
        <a href="/">Meme+</a>
        <a href="/">Blogs & News</a>



      </nav>

      <div className="auth-buttons">
        <button onClick={handleLogin} className="login-btn">Log In</button>
        <button onClick={handleSignUp} className="signup-btn">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;