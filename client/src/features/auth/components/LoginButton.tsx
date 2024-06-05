import React from 'react';

const LoginButton: React.FC = () => {
  const navigate = () => {
    window.location.href =
      'https://skyscraper.auth.us-east-2.amazoncognito.com/login?client_id=3je02pgra9uoqpjb46ckvsba82&response_type=token&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fdashboard';
  };

  return (
    <div>
      <button className='log-button' onClick={navigate}>
        Get Started
      </button>
    </div>
  );
};

export default LoginButton;
