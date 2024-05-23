import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import LogoutButton from '../auth/components/LogoutButton';
import { fetchEC2Stats, selectEC2Stats, selectEC2Status, selectEC2Error } from './EC2StatsSlice';
import CustomBarChart from './components/graphs/CustomBarChart';

const EC2MonitorPage: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const dispatch = useAppDispatch();
  const statistics = useAppSelector((state) => selectEC2Stats(state));
  const status = useAppSelector((state) => selectEC2Status(state));
  const error = useAppSelector((state) => selectEC2Error(state));

  useEffect(() => {
    dispatch(fetchEC2Stats());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <LogoutButton />
        <h1>EC2 Monitor</h1>
        <Link to='/'>
          <button className='homebutton'>Main Page</button>
        </Link>
        {Object.keys(statistics).map((instanceId: string) => (
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
