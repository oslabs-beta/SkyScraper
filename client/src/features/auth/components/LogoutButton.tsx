import React, { useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { toggleDropdown, closeDropdown } from './dropDownSlice';

const LogoutButton: React.FC = () => {
  const { logout, isAuthenticated } = useAuth0();
  const showDropdown = useAppSelector((state: RootState) => state.dropDown.showDropdown);
  const mode = useAppSelector((state: RootState) => state.theme.mode); // Access theme mode
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    backgroundColor: mode === 'light' ? 'lightblue' : '#333', // Conditionally set background color
    border: '1px solid #ccc',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    zIndex: 1000,
    color: mode === 'light' ? '#000' : '#fff', // Conditionally set text color
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
    return null; // Do not render anything if not authenticated
  }

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <div onClick={handleIconClick}>
        <ion-icon name='person-circle-outline' style={iconStyle}></ion-icon>
      </div>
      <div style={dropdownStyle}>
        <ul style={{ listStyleType: 'none', margin: 0, padding: '10px' }}>
          <li style={{ padding: '5px 0' }}>
            <button
              className='logout-button'
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LogoutButton;
