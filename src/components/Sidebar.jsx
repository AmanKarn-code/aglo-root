import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ activePage, setActivePage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { name: 'Home', page: 'home' },
    { name: 'Dashboard', page: 'dashboard' },
    { name: 'Profile', page: 'profile' },
    { name: 'Settings', page: 'settings' }
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="mobile-toggle-btn"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Sidebar */}
      <div 
        className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}
      >
        <ul>
          {menuItems.map((item) => (
          <Link to='/'>
            <li 
            key={item.page}
            className={activePage === item.page ? 'active' : ''}
            onClick={() => {
              setActivePage(item.page);
              setIsSidebarOpen(false);
            }}
            >
              {item.name}
            </li>
          </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
