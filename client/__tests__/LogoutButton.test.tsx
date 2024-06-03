import React from 'react';
import { render, screen } from '@testing-library/react';
//import { MemoryRouter } from 'react-router-dom';
import LogoutButton from '../src/features/auth/components/LogoutButton'; // Importing the component
import '@testing-library/jest-dom';

// test to check if component is being rendered to the screen by targeting buttons HTML text
test('renders logoyt button', () => {
  render(<LogoutButton />);

  {
    React.createElement(LogoutButton as React.ComponentType);
  }
  const button = screen.getByText('Log Out');
  expect(button).toBeInTheDocument();
});
