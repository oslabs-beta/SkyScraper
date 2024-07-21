import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleDropdown, closeDropdown } from '../dropDownSlice';
import { clearTokens } from '../authSlice';

const LogoutButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.rootReducer.auth.tokens.access_token);
  const showDropdown = useAppSelector((state) => state.rootReducer.dropDown.showDropdown);
  const mode = useAppSelector((state) => state.rootReducer.theme.mode);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const logout = () => {
    dispatch(clearTokens());
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    navigate('/');
    window.history.pushState(null, '', window.location.href);
    window.history.go(0);
  };

  const iconStyle: React.CSSProperties = {
    fontSize: '35px',
    cursor: 'pointer',
    color: '#000',
  };

  const dropdownStyle: React.CSSProperties = {
    display: showDropdown ? 'block' : 'none',
    position: 'absolute',
    top: '45px',
    right: '0px',
    backgroundColor: mode === 'light' ? 'lightblue' : '#121212',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    zIndex: 1000,
    color: mode === 'light' ? '#000' : '#fff',
  };

  const handleIconClick = () => {
    dispatch(toggleDropdown());
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      dispatch(closeDropdown());
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <div onClick={handleIconClick}>
        <ion-icon name='person-circle-outline' style={iconStyle}></ion-icon>
      </div>
      <div style={dropdownStyle}>
        <ul style={{ listStyleType: 'none', margin: 0, padding: '10px' }}>
          <li style={{ padding: '5px 0' }}>
            <Link to='/' className='no-underline'>
              <button className='log-button' onClick={logout}>
                Logout
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LogoutButton;
