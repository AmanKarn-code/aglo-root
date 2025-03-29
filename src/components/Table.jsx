import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';

// Expanded mock data with 30 entries
const mockData = [
   { id: 1, name: 'John Doe', email: 'john@example.com', age: 28 },
   { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 22 },
   { id: 3, name: 'Mark Wilson', email: 'mark@example.com', age: 32 },
   { id: 4, name: 'Lucy Brown', email: 'lucy@example.com', age: 24 },
   { id: 5, name: 'Chris Johnson', email: 'chris@example.com', age: 35 },
   { id: 6, name: 'Emma White', email: 'emma@example.com', age: 27 },
   { id: 7, name: 'Oliver Black', email: 'oliver@example.com', age: 30 },
   { id: 8, name: 'Sophia Green', email: 'sophia@example.com', age: 26 },
   { id: 9, name: 'James Miller', email: 'james@example.com', age: 33 },
   { id: 10, name: 'Mia Anderson', email: 'mia@example.com', age: 29 },
   { id: 11, name: 'David Lee', email: 'david.lee@company.com', age: 41 },
   { id: 12, name: 'Sarah Kim', email: 'sarah.kim@tech.org', age: 37 },
   { id: 13, name: 'Michael Chen', email: 'michael.chen@startup.io', age: 45 },
   { id: 14, name: 'Emily Rodriguez', email: 'emily.r@global.net', age: 29 },
   { id: 15, name: 'Alex Turner', email: 'alex.turner@creative.com', age: 33 },
   { id: 16, name: 'Rachel Park', email: 'rachel.park@design.co', age: 26 },
   { id: 17, name: 'Tom Harris', email: 'tom.harris@marketing.biz', age: 38 },
   { id: 18, name: 'Linda Wang', email: 'linda.wang@finance.com', age: 42 },
   { id: 19, name: 'Kevin Martinez', email: 'kevin.m@research.org', age: 36 },
   { id: 20, name: 'Anna Thompson', email: 'anna.thompson@media.net', age: 31 },
   { id: 21, name: 'Ryan Garcia', email: 'ryan.garcia@innovation.io', age: 27 },
   { id: 22, name: 'Nicole Chen', email: 'nicole.chen@cloud.com', age: 34 },
   { id: 23, name: 'Brian Kim', email: 'brian.kim@software.tech', age: 39 },
   { id: 24, name: 'Jessica Wong', email: 'jessica.wong@digital.org', age: 28 },
   { id: 25, name: 'Eric Taylor', email: 'eric.taylor@consulting.biz', age: 44 },
   { id: 26, name: 'Karen Liu', email: 'karen.liu@analytics.com', age: 35 },
   { id: 27, name: 'Steven Miller', email: 'steven.miller@global.io', age: 40 },
   { id: 28, name: 'Maria Garcia', email: 'maria.garcia@network.net', age: 32 },
   { id: 29, name: 'Daniel Park', email: 'daniel.park@strategy.org', age: 37 },
   { id: 30, name: 'Julia Rodriguez', email: 'julia.rodriguez@innovation.com', age: 30 }
];

const Table = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ 
      key: 'name', 
      direction: 'asc' 
    });
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 4;
 
    // Sorting function
    const sortData = (data) => {
      return [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) 
          return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) 
          return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    };
 
    // Filtering function
    const filteredData = mockData.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
 
    // Sorting the filtered data
    const sortedData = sortData(filteredData);
 
    // Pagination
    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentData = sortedData.slice(indexOfFirst, indexOfLast);
 
    // Sorting handler
    const handleSort = (key) => {
      setSortConfig(prevConfig => ({
        key,
        direction: prevConfig.key === key && prevConfig.direction === 'asc' 
          ? 'desc' 
          : 'asc'
      }));
      setCurrentPage(1);
    };
 
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
    };
 
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
 
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
 
    return (
      <div className="table-container">
        <div className="table-wrapper">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
 
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('name')}>
                    Name 
                    {sortConfig.key === 'name' && (
                      <span className="sort-icon">
                        {sortConfig.direction === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort('email')}>
                    Email
                    {sortConfig.key === 'email' && (
                      <span className="sort-icon">
                        {sortConfig.direction === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort('age')}>
                    Age
                    {sortConfig.key === 'age' && (
                      <span className="sort-icon">
                        {sortConfig.direction === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((row, index) => (
                  <tr key={row.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
 
          <div className="pagination-container">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </button>
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage * rowsPerPage >= filteredData.length}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
 };
 
 export default Table;