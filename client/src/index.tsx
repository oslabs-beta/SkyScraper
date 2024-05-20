import React from 'react';
import { createRoot } from 'react-dom/client'; // Note the new import path for ReactDOM
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}
createRoot(rootElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
