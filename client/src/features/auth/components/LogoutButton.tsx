import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const iconStyle: React.CSSProperties = {
    fontSize: '35px',
    cursor: 'pointer'
  };
  const buttonStyle: React.CSSProperties ={
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent' 
  }

  const dropdownStyle: React.CSSProperties = {
    display: showDropdown ? 'block' : 'none',
    position: 'absolute',
    top: '45px', // Adjust as needed
    right: '0px', // Adjust as needed
    backgroundColor: 'lightblue',
    border: '1px solid #ccc',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    zIndex: 1000
  };

  const handleIconClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <div onClick={handleIconClick}>
        <ion-icon name='person-circle-outline' style={iconStyle}></ion-icon>
      </div>
      <div style={dropdownStyle}>
        <ul style={{ listStyleType: 'none', margin: 0, padding: '10px' }}>
          <li style={{ padding: '5px 0' }}>
            <button style={buttonStyle}> Profile 
            </button>
            <button style={buttonStyle} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LogoutButton;
