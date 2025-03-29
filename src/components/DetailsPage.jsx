import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Table from './Table';

const DetailsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} />

      <div className="">
        <h1 style={{textAlign:"center",margin:"6rem 0rem 1rem 0px"}}>Details Page</h1>
        <Table />
      </div>
    </div>
  );
};

export default DetailsPage;
