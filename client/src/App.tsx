import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import HomePage from './features/homepage/HomePage';
import DashboardPage from './features/dashboard/DashboardPage';
import EC2MonitorPage from './features/ec2Monitor/EC2MonitorPage';
import Navbar from './features/navbar/Navbar';
import './styles/styles.css';
import './styles/navbar.css';
import './styles/LoginPage.css';

const App: React.FC = () => {
  const mode = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    document.body.className = mode === 'light' ? 'light-mode' : 'dark-mode';
  }, [mode]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/ec2' element={<EC2MonitorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
