import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginBackground from '../../../assets/LoginBackground';

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const iconStyle: React.CSSProperties = {
    fontSize: '40px',
    cursor: 'pointer',
   
  };

  return (
    <div>
      {/* <img
        src={LoginBackground}
        alt='Login Background'
        className='login-background'
        width='350'
        height='350'
      /> */}
      
      <button onClick={() => loginWithRedirect()}><ion-icon name="lock-open-outline" style={iconStyle}></ion-icon></button>
    </div>
  );
};

export default LoginButton;
