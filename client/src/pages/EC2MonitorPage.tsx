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
      <CustomBarChart stats={statistics} />
    </div>
  );
};

export default EC2MonitorPage;
