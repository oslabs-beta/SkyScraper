import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import EC2Logo from '../../assets/EC2logo';
import { EC2Instance } from '../../app/types';
import {
  fetchEC2Instances,
  selectEC2Instances,
  selectEC2Status,
  selectEC2Error,
} from './dashboardSlice';

const DashboardPage: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const dispatch = useAppDispatch();
  const instances = useAppSelector((state) => selectEC2Instances(state));
  const status = useAppSelector((state) => selectEC2Status(state));
  const error = useAppSelector((state) => selectEC2Error(state));
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
    }, 2500);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    isAuthenticated && (
      <div>
        <main className='inner-body'>
          <div id='title'>
            <h2>EC2 Instances</h2>
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
                {instances.length} Instances: {activeInstancesCount} Running
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
                    {/* <p>ID: {instance.InstanceId}</p> */}
                    <p>Type: {instance.InstanceType}</p>
                    <p>Status: {instance.State}</p>
                  </div>
                </Link>
              ))}
            </div>
            <h2>Other Services: coming soon</h2>
          </div>
        </main>
      </div>
    )
  );
};

export default DashboardPage;
