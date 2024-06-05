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

      <button id='get-started' onClick={() => loginWithRedirect()}>
        {/* <ion-icon name='lock-open-outline' style={iconStyle}></ion-icon> */}
        Get Started
        {/* <div className='cssbuttons-io-button'>
          <svg height='24' width='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path d='M0 0h24v24H0z' fill='none'></path>
            <path
              d='M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z'
              fill='currentColor'
            ></path>
          </svg>
        </div> */}
      </button>
    </div>
  );
};

export default LoginButton;
