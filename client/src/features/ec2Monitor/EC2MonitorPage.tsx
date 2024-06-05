import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchEC2Stats, selectEC2Stats, selectEC2Error } from './EC2StatsSlice';
import CustomBarChart from './components/CustomBarChart';

const EC2MonitorPage: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const dispatch = useAppDispatch();
  const statistics = useAppSelector((state) => selectEC2Stats(state));
  const error = useAppSelector((state) => selectEC2Error(state));

  useEffect(() => {
    dispatch(fetchEC2Stats());
  }, [dispatch]);

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
