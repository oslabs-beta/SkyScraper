import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();

  const iconStyle = {
    fontSize: '35px', // Adjust the font size to increase the icon size
    // Add any other styles you want to customize the icon
  };

  return (
    <div onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      <ion-icon name='person-circle-outline' style={iconStyle}>
        {' '}
      </ion-icon>
    </div>
  );
};

export default LogoutButton;
