import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginBackground from '../../../assets/LoginBackground';

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className='login-button-container'>
      <img
        src={LoginBackground}
        alt='Login Background'
        className='login-background'
        width='350'
        height='350'
      />
      <button onClick={() => loginWithRedirect()}>Log In</button>
    </div>
  );
};

export default LoginButton;
