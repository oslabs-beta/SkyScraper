import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      <ion-icon name="person-circle-outline"></ion-icon>
     
    </div>
  );
};

export default LogoutButton;

