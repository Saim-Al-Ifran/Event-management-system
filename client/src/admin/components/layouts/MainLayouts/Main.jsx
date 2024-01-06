// MainLayout.js
import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="page-wrapper">
      <Header />
      <Sidebar />
      <div className="page-container">
        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
