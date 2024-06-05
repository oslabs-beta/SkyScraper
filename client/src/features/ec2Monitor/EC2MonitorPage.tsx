import React from 'react';
import { Link } from 'react-router-dom';
import { useGetStatsQuery } from '../auth/authAPI';
import LogoutButton from '../auth/components/LogoutButton';
import CustomBarChart from './components/CustomBarChart';

const EC2MonitorPage: React.FC = () => {
  const {
    data: statistics = {},
    isLoading,
    isError,
    error,
  } = useGetStatsQuery(undefined, {
    pollingInterval: 4000,
    skipPollingIfUnfocused: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  const sortedInstanceIds = Object.keys(statistics).sort((a, b) => {
    const nameA = (statistics[a][0]?.name ?? '').toUpperCase();
    const nameB = (statistics[b][0]?.name ?? '').toUpperCase();
    return nameA.localeCompare(nameB);
  });

  return (
    <div>
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
  );
};

export default EC2MonitorPage;
