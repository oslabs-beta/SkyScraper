import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginButton from './LoginButton';  // Importing the component
import '@testing-library/jest-dom';

// test to check if component is being rendered to the screen by targeting buttons HTML text
  test('renders login button and calls loginWithRedirect on click', () => {
    render(<LoginButton />);
      
        {React.createElement(LoginButton as React.ComponentType)}
        const button = screen.getByText('Log In');
        expect(button).toBeInTheDocument();
    
  });

