// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import Navbar from '../src/component/Navbar';

// describe('NavBar', () => {
//   it('renders navigation links and logo', () => {
//     render(
//       <MemoryRouter>
//         <Navbar />
//       </MemoryRouter>,
//     );

//     // Check for logo and links
//     expect(screen.getByAltText('Logo')).toBeInTheDocument();
//     expect(screen.getByText('Home')).toBeInTheDocument();
//     expect(screen.getByText('EC2 Monitor')).toBeInTheDocument();
//   });
// });

// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import Navbar from '../src/features/navbar/Navbar';

// describe('NavBar', () => {
//   it('renders navigation links and logo', () => {
//     const mockToggleDarkMode = jest.fn();

//     render(
//       <MemoryRouter>
//         <Navbar isDarkMode={false} toggleDarkMode={mockToggleDarkMode} />
//       </MemoryRouter>,
//     );

//     // Check for logo and links
//     expect(screen.getByAltText('Logo')).toBeInTheDocument();
//     expect(screen.getByText('Home')).toBeInTheDocument();
//     expect(screen.getByText('EC2 Monitor')).toBeInTheDocument();
//     expect(screen.getByText('Dark Mode')).toBeInTheDocument();
//   });
// });
