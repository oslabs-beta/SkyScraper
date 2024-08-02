import React, { useEffect } from 'react';
import { useGetStatsQuery } from '../auth/authAPI';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setTokens } from '../auth/authSlice';
import CustomBarChart from './components/Charts';

const EC2MonitorPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.rootReducer.auth.tokens.access_token);
  const theme = useAppSelector((state) => state.rootReducer.theme.mode);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = urlParams.get('access_token');
    const idToken = urlParams.get('id_token');

    if (accessToken && idToken) {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('id_token', idToken);
      dispatch(setTokens({ tokens: { access_token: accessToken, id_token: idToken } }));
    } else {
      const storedAccessToken = localStorage.getItem('access_token');
      const storedIdToken = localStorage.getItem('id_token');

      if (storedAccessToken && storedIdToken) {
        dispatch(
          setTokens({ tokens: { access_token: storedAccessToken, id_token: storedIdToken } }),
        );
      }
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const {
    data: statistics = {},
    isError,
    error,
  } = useGetStatsQuery(undefined, {
    pollingInterval: 2500,
    skipPollingIfUnfocused: true,
  });

  if (isError) {
    return <div className='isError'>Error {(error as Error).message}</div>;
  }

  const sortedInstanceIds = Object.keys(statistics).sort((a, b) => {
    const nameA = (statistics[a][0]?.name ?? '').toUpperCase();
    const nameB = (statistics[b][0]?.name ?? '').toUpperCase();
    return nameA.localeCompare(nameB);
  });

  return (
    isAuthenticated && (
      <div className='inner-body'>
        {sortedInstanceIds.map((instanceId) => (
          <div key={instanceId}>
            <h2>Instance Name: {statistics[instanceId][0].name}</h2>
            <CustomBarChart instanceData={statistics[instanceId]} />
          </div>
        ))}
      </div>
    )
  );
};

export default EC2MonitorPage;
