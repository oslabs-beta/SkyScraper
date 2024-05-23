import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import {
  fetchEC2Stats,
  selectEC2Stats,
  selectEC2Status,
  selectEC2Error,
} from '../reducers/EC2StatsSlice';
import CustomBarChart from '../components/graphics/CustomBarChart';
import { Link } from 'react-router-dom';

const EC2MonitorPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const statistics = useSelector((state: RootState) => selectEC2Stats(state));
  const status = useSelector((state: RootState) => selectEC2Status(state));
  const error = useSelector((state: RootState) => selectEC2Error(state));

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
    <div>
      <h1>EC2 Monitor</h1>
      <Link to='/'>
        <button className='homebutton'>Main Page</button>
      </Link>
      {Object.keys(statistics).map((instanceId: string) => (
        <div key={instanceId}>
          {/* <h2>Instance ID: {instanceId}</h2> */}
          <h2>Instance Name: {statistics[instanceId][0].name}</h2>
          <CustomBarChart instanceData={statistics[instanceId]} />
        </div>
      ))}
    </div>
  );
};

export default EC2MonitorPage;
