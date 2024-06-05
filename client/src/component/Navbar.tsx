// src/components/NavBar.tsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';
// import LogoutButton from '../features/auth/components/LogoutButton';
// import logo from '../assets/SkyScrapper'; // Add your CSS styles

// const NavBar: React.FC = () => {
//   const { isAuthenticated } = useAuth0();

//   return (
//     <nav className='nav-bar'>
//       <img src={logo} alt='Logo' className='nav-logo' width='40' height='40' />
//       <div className='nav-items'>

//         <Link to='/dashboard'>Home</Link>
//         <Link to='/ec2'>EC2 Monitor</Link>
//         <LogoutButton />
//       </div>
//       {/* {isAuthenticated && <LogoutButton />} */}
//       {/* adding a comment */}
//     </nav>
//   );

// };

// export default NavBar;

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../features/auth/components/LogoutButton';
import logo from '../assets/LogoSquare'; // Add your CSS styles

interface NavBarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <nav className={`nav-bar ${isDarkMode ? 'dark-mode' : ''}`}>
      <img src={logo} alt='Logo' className='nav-logo' width='40' height='40' />
      <div className='nav-items'>
        <Link to='/dashboard'>Home</Link>
        <Link to='/ec2'>EC2 Monitor</Link>
        <LogoutButton />
        <button onClick={toggleDarkMode}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</button>
      </div>
    </nav>
  );
};

export default NavBar;
