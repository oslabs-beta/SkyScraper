import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import DashboardPage from './features/dashboard/DashboardPage';
import EC2MonitorPage from './features/ec2Monitor/EC2MonitorPage';
import './styles/styles.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/ec2' element={<EC2MonitorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
