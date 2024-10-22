import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import { useAuth0 } from '@auth0/auth0-react';

import HomePage from './features/homepage/HomePage';
import DashboardPage from './features/dashboard/DashboardPage';
import EC2MonitorPage from './features/ec2Monitor/EC2MonitorPage';
import NavBar from './features/navbar/Navbar';

//styles should be imported to their individual pages with an App.css for general all purpose css
import './styles/styles.css';
import './styles/Navbar.css';
import './styles/LoginPage.css';
import './styles/HomePage.css';

const App: React.FC = () => {
  const { isLoading, error } = useAuth0();

  // this should be changed for production enviroment
  if (error) return <div>Oops... {error.message}</div>;
  // missing loading page
  // if (isLoading) return <Loading />;

  // optionally match theme to users preference on their computer
  const mode = useAppSelector((state) => state.rootReducer.theme.mode);

  useEffect(() => {
    document.body.className = mode === 'light' ? 'light-mode' : 'dark-mode';
  }, [mode]);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/ec2' element={<EC2MonitorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
