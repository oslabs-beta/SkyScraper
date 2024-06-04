import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import EC2MonitorPage from '../src/features/ec2Monitor/EC2MonitorPage';

// Mock Store Setup (without thunk middleware)
const mockStore = configureStore(); // No middleware

describe('EC2MonitorPage', () => {
  // Test for 'Loading...' state
  test('renders "Loading..." when status is loading', () => {
    const store = mockStore({
      EC2Stats: {
        stats: {},
        status: 'loading', // Set status to 'loading'
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <EC2MonitorPage />
      </Provider>,
    );

    const loadingElement = screen.getByText('Loading...');
    expect(loadingElement).toBeInTheDocument();
  });
});
