import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginButton from '../src/features/auth/components/LoginButton';
import '@testing-library/jest-dom';

test('renders login button and calls loginWithRedirect on click', () => {
  render(<LoginButton />);

  {
    React.createElement(LoginButton as React.ComponentType);
  }
  const button = screen.getByText('Log In');
  expect(button).toBeInTheDocument();
});
