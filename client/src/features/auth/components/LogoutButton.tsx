import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { clearTokens } from '../authSlice';
import { Link } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(clearTokens());
  };
  return (
    <Link to='/'>
      <button onClick={logout}>Log Out</button>
    </Link>
  );
};

export default LogoutButton;
