import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import EC2MonitorPage from './pages/EC2MonitorPage';
import './styles/styles.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='/ec2' element={<EC2MonitorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
