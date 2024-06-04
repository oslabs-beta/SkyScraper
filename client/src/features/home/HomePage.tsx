// import React, { useEffect } from 'react';
// import LoginButton from '../auth/components/LoginButton';
// import SkyScrapper from '../../assets/SkyScrapper';
// import '../../styles/HomePage.css'; // Import the CSS file

// const HomePage: React.FC = () => {
//   useEffect(() => {
//     // Apply background image to body
//     document.body.style.backgroundImage = `url(${SkyScrapper})`;
//     document.body.style.backgroundSize = 'cover';
//     document.body.style.backgroundPosition = 'center';
//     document.body.style.height = '100vh';
//     document.body.style.width = '100vw';
//     document.body.style.margin = '0';
//     document.body.style.padding = '0';
//     document.body.style.overflow = 'hidden';

//     // Clean up the effect
//     return () => {
//       document.body.style.backgroundImage = '';
//       document.body.style.backgroundSize = '';
//       document.body.style.backgroundPosition = '';
//       document.body.style.height = '';
//       document.body.style.margin = '';
//     };
//   }, []);

//   return (
//     <div className='login-button-container'>
//       <div className='HpHeader'>
//         <h1> Welcome to SkyScraper. Please click the unlock icon to Log In to get started.</h1>
//         {/* <h2>Get Started. Press Login to Continue</h2> */}
//       </div>
//       <div className='LoginButtonWrapper'>
//         {' '}
//         {/* New wrapper div */}
//         <LoginButton />
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useEffect, useState } from 'react';
import LoginButton from '../auth/components/LoginButton';
import SkyScrapper from '../../assets/SkyScrapper';
import Navbar from '../../component/Navbar';
import '../../styles/HomePage.css'; // Import the CSS file

const HomePage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Apply background image to body
    document.body.style.backgroundImage = `url(${SkyScrapper})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.height = '100vh';
    document.body.style.width = '100vw';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';

    // Clean up the effect
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.height = '';
      document.body.style.width = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className='login-button-container'>
        <div className='HpHeader'>
          <h1> Welcome to SkyScraper. Please click the unlock icon to Log In to get started.</h1>
          {/* <h2>Get Started. Press Login to Continue</h2> */}
        </div>
        <div className='LoginButtonWrapper'>
          {' '}
          {/* New wrapper div */}
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
