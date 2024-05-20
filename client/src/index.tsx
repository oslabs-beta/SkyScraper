// /src/index.tsx
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import store from './app/store';
// import App from './App';
// import './styles/styles.css';

// const rootElement = document.getElementById('root');
// if (!rootElement) {
//   throw new Error('Failed to find the root element');
// }

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   rootElement,
// );

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
