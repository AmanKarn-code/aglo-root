import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem('user');
    alert('Account Deleted!');
    navigate('/');
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-first-item" onClick={() => navigate('/details')}>
        <img src="https://img.freepik.com/premium-photo/tree-fire-vector-flat-minimalistic-isolated-illustration_748571-12392.jpg" alt="Logo" />
      </div>

      {/* User Icon Dropdown */}
      {user && (
        <div className="user-icon">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FaUserCircle size={24} />
            <span>{user.name}</span>
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu" style={{ animation: 'dropdownFadeIn 0.3s ease' }}>
              <p className="text-sm">{user.email}</p>
              <button
                onClick={handleLogout}
                className="text-red-500 mt-2 w-full text-left"
              >
                Logout
              </button>
              <button
                onClick={handleDeleteAccount}
                className="text-red-500 mt-2 w-full text-left"
              >
                Delete Account
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
