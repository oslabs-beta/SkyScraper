import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button className='log-button' onClick={() => loginWithRedirect()}>
      Get Started
    </button>
  );
};

export default LoginButton;
