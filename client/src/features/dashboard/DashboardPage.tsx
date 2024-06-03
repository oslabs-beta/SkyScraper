import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import EC2Logo from '../../assets/EC2Logo';
import LogoutButton from '../auth/components/LogoutButton';
import {
  fetchEC2Instances,
  selectEC2Instances,
  selectEC2Status,
  selectEC2Error,
} from './dashboardSlice';
import { EC2Instance } from '../../app/types';

/**
 * DashboardPage component.
 *
 * This component represents the dashboard page of the application.
 * It displays information about EC2 instances and allows navigation to other services.
 *
 * @component
 * @returns {JSX.Element} The JSX representation of the DashboardPage component.
 */
const DashboardPage: React.FC = () => {
  //Authentication status
  const { isAuthenticated } = useAuth0();

  //Redux hooks
  const dispatch = useAppDispatch();
  const instances = useAppSelector((state) => selectEC2Instances(state));
  const status = useAppSelector((state) => selectEC2Status(state));
  const error = useAppSelector((state) => selectEC2Error(state));

  //Sorting instance alphabetically by name
  const sorted = [...instances].sort((a, b) =>
    a.Name.toLocaleLowerCase().localeCompare(b.Name.toLocaleLowerCase()),
  );

  const activeInstancesCount = instances.filter((ele) => ele.State === 'running').length;

  useEffect(() => {
    dispatch(fetchEC2Instances());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchEC2Instances());
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    isAuthenticated && (
      <div>
        <main>
          <LogoutButton />
          <div id='title'>
            <h1>SkyScraper</h1>
            <div
              id='instances-running'
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexGrow: 'auto',
              }}
            >
              <p>
                EC2: {instances.length} instances, {activeInstancesCount} running
              </p>
              {status === 'loading' && (
                <div className='three-body' style={{ marginLeft: '10px' }}>
                  <div className='three-body__dot'></div>
                  <div className='three-body__dot'></div>
                  <div className='three-body__dot'></div>
                </div>
              )}
            </div>

            {error && <p>Error: {error}</p>}
            <h2>EC2 Instances</h2>
            <div
              id='displayedinstances'
              style={{
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {sorted.map((instance: EC2Instance) => (
                <Link className='link' to='/ec2' key={instance.InstanceId}>
                  <div className='singleInstance' key={instance.InstanceId}>
                    <img src={EC2Logo} width='35' height='35'></img>
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
    )
  );
};

export default DashboardPage;
