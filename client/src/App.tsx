import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import HomePage from './features/home/HomePage';
import DashboardPage from './features/dashboard/DashboardPage';
import EC2MonitorPage from './features/ec2Monitor/EC2MonitorPage';
import './styles/styles.css';
import './styles/navbar.css';
import './styles/LoginPage.css';

const mode = useAppSelector((state) => state.theme.mode);

useEffect(() => {
  document.body.className = mode === 'light' ? 'light-mode' : 'dark-mode';
}, [mode]);

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/dashboard' element={<DashboardPage />} />
      <Route path='/ec2' element={<EC2MonitorPage />} />
    </Routes>
  </Router>
);

export default App;
