import React from 'react';
// import { useDispatch } from 'react-redux';
// import { useLoginQuery } from '../auth/authAPI';
// import { setToken } from '../auth/authSlice';

// const LoginButton: React.FC = () => {
//   const dispatch = useDispatch();
//   const { data, error, isLoading, refetch } = useLoginQuery();

//   const handleLogin = () => {
//     refetch();
//   };

//   React.useEffect(() => {
//     if (data) {
//       dispatch(setToken(data.message)); // Assuming the token is in the message field
//     }
//   }, [data, dispatch]);

//   return (
//     <button onClick={handleLogin} disabled={isLoading}>
//       {isLoading ? 'Logging in...' : 'Login'}
//     </button>
//   );
// };

// export default LoginButton;

const LoginPage: React.FC = () => {
  return (
    <div>
      <button></button>
    </div>
  );
};

export default LoginPage;
