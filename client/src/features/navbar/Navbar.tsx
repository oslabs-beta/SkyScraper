import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleTheme } from '../themes/themeSlice';
import LogoutButton from '../auth/components/LogoutButton';
import logo from '../../assets/SkyScraperLogo';
import moon from '../../assets/Moon';

const NavBar: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.rootReducer.auth.tokens.access_token);
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.rootReducer.theme.mode);

  const handleClick = () => {
    dispatch(toggleTheme());
  };

  const navBarStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: mode === 'dark' ? '#FFD700' : '#1ab9cabe',
    padding: '10px 20px',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
    boxSizing: 'border-box',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease',
  };

  const navLeftStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#000',
  };

  const navTitleStyle: React.CSSProperties = {
    margin: 0,
    marginLeft: '10px',
    fontSize: '1.5rem',
    paddingTop: '5px',
  };

  const navItemsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };

  const modeStyle: React.CSSProperties = {
    marginLeft: '20px',
    marginRight: '10px',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    filter: mode === 'dark' ? 'invert(0%)' : 'invert(100%)',
  };

  return (
    <nav style={navBarStyle}>
      {isAuthenticated ? (
        <Link to='/dashboard' style={navLeftStyle}>
          <img src={logo} alt='Logo' width='40' height='40' />
          <h1 style={navTitleStyle}>SkyScraper</h1>
        </Link>
      ) : (
        <div style={navLeftStyle}>
          <img src={logo} alt='Logo' width='40' height='40' />
          <h1 style={navTitleStyle}>SkyScraper</h1>
        </div>
      )}
      <div style={navItemsStyle}>
        {isAuthenticated && (
          <img
            style={modeStyle}
            src={moon}
            alt='Logo'
            width='25'
            height='25'
            onClick={handleClick}
          />
        )}
        {isAuthenticated && <LogoutButton />}
      </div>
    </nav>
  );
};

export default NavBar;
