import React, { useEffect } from 'react';
import LoginButton from '../auth/components/LoginButton';
import SkyScraper from '../../assets/LoginBackground';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${SkyScraper})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.height = '100vh';
    document.body.style.width = '100vw';
    document.body.style.margin = '100';
    document.body.style.padding = '1000';
    document.body.style.overflow = 'hidden';

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

  return (
    <div>
      <div className='login-button-container'>
        <div className='HpHeader'>
          <h1> Welcome to SkyScraper</h1>
        </div>
        <div className='LoginButtonWrapper'>
          {' '}
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
