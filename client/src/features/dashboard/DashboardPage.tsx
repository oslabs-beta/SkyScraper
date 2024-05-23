import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchEC2Instances,
  selectEC2Instances,
  selectEC2Status,
  selectEC2Error,
} from '../ec2Monitor/ec2MonitorSlice';
// import MainMenu from '../components/utilities/MainMenu';
import { AppDispatch, RootState } from '../../app/store';

const MainPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const instances = useSelector((state: RootState) => selectEC2Instances(state));
  const status = useSelector((state: RootState) => selectEC2Status(state));
  const error = useSelector((state: RootState) => selectEC2Error(state));
  const sorted = [...instances].sort((a, b) =>
    a.Name.toLocaleLowerCase().localeCompare(b.Name.toLocaleLowerCase()),
  );

  useEffect(() => {
    dispatch(fetchEC2Instances());
  }, [dispatch]);

  return (
    <div>
      <main>
        {/* <MainMenu /> */}
        <div id='title'>
          <h2>Main Page</h2>
          <Link to='/ec2-monitor'>
            <button>EC2: 10 instances, 2 running</button>
          </Link>
          {status === 'loading' && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          <h2>EC2 Instances</h2>
          <div id='displayedinstances'>
            {sorted.map((instance: any) => (
              <Link className='link' to='/ec2-monitor'>
                <div className='singleInstance' key={instance.InstanceId}>
                  <h3>Name: {instance.Name}</h3>
                  <p>ID: {instance.InstanceId}</p>
                  <p>Type: {instance.InstanceType}</p>
                  <p>Status: {instance.State}</p>
                </div>
              </Link>
            ))}
          </div>
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
