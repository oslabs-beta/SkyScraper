import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { clearToken } from '../authSlice';
import { Link } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(clearToken());
  };
  return (
    <Link to='/'>
      <button onClick={logout}>Log Out</button>
    </Link>
  );
};

export default LogoutButton;
