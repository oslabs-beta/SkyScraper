import React, { useRef } from 'react';
import { LogIn } from '../reducers/loginSlicer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppDispatch } from '../store';
const dispatch = useDispatch<AppDispatch>();

import '../stylesheets/Login.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const usernameRef = useRef(null);
  // const passwordRef = useRef(null);
  const usernameRef = useRef<HTMLInputElement>(null); // Specify the type for useRef
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    // event?.preventDefault();
    event.preventDefault();
    // const username = usernameRef.current.value;
    // const password = passwordRef.current.value;
    // In LoginPage.tsx, modify your variable assignments to:
    const username = usernameRef.current ? usernameRef.current.value : '';
    const password = passwordRef.current ? passwordRef.current.value : '';

    if (!username || !password) {
      console.log('Username or Password is missing');
      return;
    }

    dispatch(LogIn({ username, password }))
      .then(() => {
        navigate('/dashboard'); // navigate to next page's path
      })
      // .catch((error) => console.log('Login failed', error));
      .catch((error: any) => console.log('Login failed', error));
  };

  return (
    <div className='loginForm'>
      <form onSubmit={handleLogin}>
        <input
          className='input'
          name='username'
          type='text'
          placeholder='Username'
          ref={usernameRef}
          required
        />
        <input
          className='input'
          name='password'
          type='password'
          placeholder='Password'
          ref={passwordRef}
          required
        />
        <button type='submit' className='loginButton'>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
