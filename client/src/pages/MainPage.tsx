import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchEC2Instances,
  selectEC2Instances,
  selectEC2Status,
  selectEC2Error,
} from '../reducers/ec2MonitorSlice';
import MainMenu from '../components/utilities/MainMenu';
import { AppDispatch, RootState } from '../store';

const MainPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const instances = useSelector((state: RootState) => selectEC2Instances(state));
  const status = useSelector((state: RootState) => selectEC2Status(state));
  const error = useSelector((state: RootState) => selectEC2Error(state));

  useEffect(() => {
    dispatch(fetchEC2Instances());
  }, [dispatch]);

  return (
    <div>
      <main>
        <MainMenu />
        <div>
          <h2>MVP Feature</h2>
          <Link to='/ec2-monitor'>
            <button>EC2: 10 instances, 2 running</button>
          </Link>
          {status === 'loading' && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          <h2>EC2 Instances</h2>
          {instances.map((instance: any) => (
            <div key={instance.InstanceId}>
              <h3>{instance.Name}</h3>
              <p>ID: {instance.InstanceId}</p>
              <p>Type: {instance.InstanceType}</p>
              <p>Status: {instance.State}</p>
            </div>
          ))}
          <h2>Other Services</h2>
          <Link to='/lambda-monitor'>
            <button>Lambda: 1 instance, none running</button>
          </Link>
          <Link to='/sqs-monitor'>
            <button>SQS: 1 instance, none running</button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
