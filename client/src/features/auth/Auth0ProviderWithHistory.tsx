// import React from 'react';
// import { Auth0Provider } from '@auth0/auth0-react';
// import { useNavigate } from 'react-router-dom';
// import authConfig from './authconfig.json';

// const Auth0ProviderWithHistory: React.FC = ({ children }) => {
//   const navigate = useNavigate();

//   const onRedirectCallback = (appState: any) => {
//     navigate(appState?.returnTo || window.location.pathname);
//   };

//   return (
//     <Auth0Provider
//       domain={authConfig.domain}
//       clientId={authConfig.clientId}
//       redirectUri={authConfig.redirectUri}
//       onRedirectCallback={onRedirectCallback}
//     >
//       {children}
//     </Auth0Provider>
//   );
// };

// export default Auth0ProviderWithHistory;
