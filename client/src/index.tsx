import { createRoot } from 'react-dom/client'; // Note the new import path for ReactDOM
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import authConfig from './features/auth/authconfig.json';
import store from './app/store';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}
createRoot(rootElement).render(
  <Provider store={store}>
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      authorizationParams={{
        redirect_uri: authConfig.redirectUri,
      }}
    >
      <App />
    </Auth0Provider>
  </Provider>,
);
