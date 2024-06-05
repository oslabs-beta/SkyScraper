import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import EC2Logo from '../../assets/EC2logo';
import LogoutButton from '../auth/components/LogoutButton';
import { setTokens } from '../auth/authSlice';
import { EC2Instance } from '../../app/types';
import { useGetEC2Query } from '../auth/authAPI';

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { access_token, id_token } = useAppSelector((state) => state.rootReducer.auth.tokens);
  /**
   * @description This effect runs once on component mount.
   * It extracts the access token from the URL hash parameter and dispatches it to update the application token state.
   */
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = urlParams.get('access_token');
    const idToken = urlParams.get('id_token');
    dispatch(setTokens({ tokens: { access_token: accessToken, id_token: idToken } }));
    console.log('accessToken post dispatch appSelector: ', accessToken);
    console.log('idToken post dispatch appSelector: ', idToken);
    console.log('access_token post dispatch appSelector: ', access_token);
    console.log('id_token post dispatch appSelector: ', id_token);
  }, [dispatch]);

  const {
    data: instances,
    isLoading,
    isError,
    error,
  } = useGetEC2Query(undefined, {
    pollingInterval: 4000,
    skipPollingIfUnfocused: true,
  });

  const sorted: EC2Instance[] = instances
    ? [...instances].sort((a: EC2Instance, b: EC2Instance) =>
        a.Name.toLocaleLowerCase().localeCompare(b.Name.toLocaleLowerCase()),
      )
    : [];

  const activeInstancesCount = instances?.filter((ele) => ele.State === 'running').length;
  return (
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
              EC2: {instances?.length} instances, {activeInstancesCount} running
            </p>
            {isLoading && (
              <div className='three-body' style={{ marginLeft: '10px' }}>
                <div className='three-body__dot'></div>
                <div className='three-body__dot'></div>
                <div className='three-body__dot'></div>
              </div>
            )}
          </div>

          {isError && <p>Error: {(error as Error).message}</p>}
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
  );
};

export default DashboardPage;
