import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Import custom styles
import { IoHomeOutline } from "react-icons/io5";


const SignupPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    const newUser = { name, email, password };
    localStorage.setItem('user', JSON.stringify(newUser));
    navigate('/details');
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-content">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-field"
            />
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
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input-field"
            />
            {error && <p className="error">{error}</p>}
            <button type="submit" className="submit-btn">Sign Up</button>
          </form>
          <p className="switch-form">
            Already have an account? <span onClick={() => navigate('/login')} className="link">Log In</span>
          </p>
          <button className="button home-btn" style={{marginTop:'1rem', backgroundColor:"red", position:'absolute', top:'0px' , left:'0px'}}><Link to='/'><IoHomeOutline /></Link></button>
          
        </div>
        <div className="image-container">
          <img
            src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg"
            alt="Signup"
            className="signup-image"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
