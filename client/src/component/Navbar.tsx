// src/components/NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../features/auth/components/LogoutButton';
import './NavBar.css';
import logo from '../assets/SkyScrapper'; // Add your CSS styles

const NavBar: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <nav className='nav-bar'>
   <img src={logo} alt="Logo" className="nav-logo" width='40' height='40'/>
      <div className='nav-items'>
        <Link to='/dashboard'>Home</Link>
        <Link to='/ec2'>EC2 Monitor</Link>
        <Link to='/lambda-monitor'>Lambda Monitor</Link>
        <Link to='/sqs-monitor'>SQS Monitor</Link>
      </div>
      {/* {isAuthenticated && <LogoutButton />} */}
    </nav>
  );
};

export default NavBar;
