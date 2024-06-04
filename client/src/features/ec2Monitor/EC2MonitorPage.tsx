import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import LogoutButton from '../auth/components/LogoutButton';
import { fetchEC2Stats, selectEC2Stats, selectEC2Status, selectEC2Error } from './EC2StatsSlice';
import CustomBarChart from './components/CustomBarChart';

/**
 * EC2MonitorPage component displays EC2 instance statistics and a custom bar chart for each instance.
 *
 * @component
 */
const EC2MonitorPage: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  //Redux hooks
  const dispatch = useAppDispatch();
  const statistics = useAppSelector((state) => selectEC2Stats(state));
  const status = useAppSelector((state) => selectEC2Status(state));
  const error = useAppSelector((state) => selectEC2Error(state));

  // Fetch EC2 statistics on component mount
  useEffect(() => {
    dispatch(fetchEC2Stats());
  }, [dispatch]);

  // Display loading message while fetching data
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  // Display error message if there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  //Sort instances based on instance names
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
    // Render component only if the user is authenticated
    isAuthenticated && (
      <div>
        {/* Logout button component */}
        <LogoutButton />
        <h1>EC2 Monitor</h1>
        {/* Link to main page */}
        <Link to='/dashboard'>
          <button className='homebutton'>Main Page</button>
        </Link>
        {/* Custom bar chart component */}
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
