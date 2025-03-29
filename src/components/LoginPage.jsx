import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/styles.css"; // Import custom styles
import { IoHomeOutline } from "react-icons/io5";


const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === email && user.password === password) {
      navigate("/details");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-content">
          <h2>Log In</h2>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
            {error && <p className="error">{error}</p>}
            <button type="submit" className="submit-btn">
              Log In
            </button>
          </form>
          <p className="switch-form">
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")} className="link">
              Sign Up
            </span>
          </p>
          <button className="button home-btn" style={{marginTop:'1rem', backgroundColor:"red", position:'absolute', top:'0px' , left:'0px'}}><Link to='/'><IoHomeOutline /></Link></button>
        </div>
        <div className="image-container">
          <img
            src="https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg"
            alt="Login"
            className="login-image"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
