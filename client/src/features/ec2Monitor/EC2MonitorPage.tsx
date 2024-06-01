import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from '../../component/Navbar';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import LogoutButton from '../auth/components/LogoutButton';
import { fetchEC2Stats, selectEC2Stats, selectEC2Status, selectEC2Error } from './EC2StatsSlice';
import CustomBarChart from './components/CustomBarChart';

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

  const sortedInstanceIds = Object.keys(statistics).sort((a, b) => {
    const nameA = statistics[a][0].name.toUpperCase();
    const nameB = statistics[b][0].name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return (
    isAuthenticated && (
      <div>
        <Navbar/>
        <LogoutButton />
        <h1>EC2 Monitor</h1>
        <Link to='/dashboard'>
          <button className='homebutton'>Main Page</button>
        </Link>
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
