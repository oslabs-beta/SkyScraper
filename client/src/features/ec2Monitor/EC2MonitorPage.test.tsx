import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Context } from '@auth0/auth0-react';
import EC2MonitorPage from './EC2MonitorPage';
import configureStore from 'redux-mock-store';

// Mocked Auth0 context
const mockAuth0Context = {
  isAuthenticated: true, // Adjust as needed for your test cases
};

// Mocked Redux store
const initialState = {
  ec2Stats: {
    statistics: {
      // Mocked EC2 statistics data
      instance1: [{ name: 'Instance 1', data: {} }],
      instance2: [{ name: 'Instance 2', data: {} }],
    },
    status: 'idle',
    error: null,
  },
};
const mockStore = configureStore();
const store = mockStore(initialState);

// Mocked Auth0 provider
const Auth0ProviderMock = ({ children }: { children: React.ReactNode } ) => (
  <Auth0Context.Provider value={mockAuth0Context}>{children}</Auth0Context.Provider>
);

describe('EC2MonitorPage component', () => {
  it('renders loading state when status is loading', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Auth0ProviderMock>
            <EC2MonitorPage />
          </Auth0ProviderMock>
        </Router>
      </Provider>
    );

    expect(getByText('Loading...')).toBeInTheDocument();
  });
});