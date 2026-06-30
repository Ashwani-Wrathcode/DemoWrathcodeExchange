import React from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
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
        <Link to="/Landing">Home</Link>
        <Link to="/">Market</Link>
        <div className="dropdown">
          <Link to="/">Trade ▼</Link>
        </div>
        <Link to="/SpotTrade">Spot Trade ▼</Link>
        <Link to="/">Earning</Link>
        <Link to="/">Quick Swap</Link>
        <Link to="/">Launchpad ▼</Link>
        <Link to="/">Meme+</Link>
        <Link to="/">Blogs & News</Link>



      </nav>

      <div className="auth-buttons">
        <button onClick={handleLogin} className="login-btn">Log In</button>
        <button onClick={handleSignUp} className="signup-btn">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;