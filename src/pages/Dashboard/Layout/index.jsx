import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../../components/Shared/Navbar';
import Sidebar from '../../../components/Shared/Sidebar';
import Icon from '../../../components/Icon';
import "./index.scss";

const Dashboard = () => {
  return (
    <div className="dashboard_container">
      <Sidebar />
      <div className="dashboard_container_box">
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard