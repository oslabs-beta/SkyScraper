import { createRoot } from 'react-dom/client'; // Note the new import path for ReactDOM
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import auth0Config from '../../auth_config.json';

import store from './app/store';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const Auth0ProviderConfig = {
  domain: auth0Config.domain,
  clientId: auth0Config.clientId,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(auth0Config.audience ? { audience: auth0Config.audience } : null),
  },
};

createRoot(rootElement).render(
  <Provider store={store}>
    <Auth0Provider {...Auth0ProviderConfig}>
      <App />
    </Auth0Provider>
  </Provider>,
);
