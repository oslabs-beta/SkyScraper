import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import {
  fetchEC2Instances,
  selectEC2Instances,
  selectEC2Status,
  selectEC2Error,
} from '../reducers/ec2MonitorSlice';
import EC2InstanceDetail from '../components/utilities/EC2InstanceDetail';

const EC2MonitorPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const instances = useSelector((state: RootState) => selectEC2Instances(state));
  const status = useSelector((state: RootState) => selectEC2Status(state));
  const error = useSelector((state: RootState) => selectEC2Error(state));

  useEffect(() => {
    dispatch(fetchEC2Instances());
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
      {instances.map((instance: any) => (
        <EC2InstanceDetail key={instance.InstanceId} instance={instance} />
      ))}
    </div>
  );
};

export default EC2MonitorPage;
