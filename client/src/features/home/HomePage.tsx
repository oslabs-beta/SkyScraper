import React, { useEffect } from 'react';
import LoginButton from '../auth/components/LoginButton';
import SkyScrapper from '../../assets/SkyScrapper';
import '../../styles/HomePage.css'; // Import the CSS file

const HomePage: React.FC = () => {
  useEffect(() => {
    // Apply background image to body
    document.body.style.backgroundImage = `url(${SkyScrapper})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.height = '100vh';
    document.body.style.margin = '0';

    // Clean up the effect
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.height = '';
      document.body.style.margin = '';
    };
  }, []);

  return (
    <div className='login-button-container'>
      <div className='HpHeader'>
        <h1> Welcome to SkyScraper. Please Log In to your AWS account.</h1>
        <h2>Get Started. Press Login to Continue</h2>
      </div>
      <div className='LoginButtonWrapper'> {/* New wrapper div */}
        <LoginButton />
      </div>
    </div>
  );
};

export default HomePage;



