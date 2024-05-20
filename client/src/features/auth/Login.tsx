// /src/features/auth/Login.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from './authSlice.js';

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login());
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
