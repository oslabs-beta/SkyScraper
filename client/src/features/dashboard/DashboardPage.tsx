import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { EC2Instance } from '../../app/types';
import { useGetEC2Query } from '../auth/authAPI';
import { setTokens } from '../auth/authSlice';
import EC2Logo from '../../assets/EC2logo';

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.rootReducer.auth.tokens.access_token);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = urlParams.get('access_token');
    const idToken = urlParams.get('id_token');

    if (accessToken && idToken) {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('id_token', idToken);
      dispatch(setTokens({ tokens: { access_token: accessToken, id_token: idToken } }));
    } else {
      const storedAccessToken = localStorage.getItem('access_token');
      const storedIdToken = localStorage.getItem('id_token');

      if (storedAccessToken && storedIdToken) {
        dispatch(
          setTokens({ tokens: { access_token: storedAccessToken, id_token: storedIdToken } }),
        );
      }
    }
  }, [dispatch]);

  const {
    data: instances,
    isLoading,
    isError,
    error,
  } = useGetEC2Query(undefined, {
    pollingInterval: 2500,
    skipPollingIfUnfocused: true,
  });

  const sorted: EC2Instance[] = instances
    ? [...instances].sort((a: EC2Instance, b: EC2Instance) =>
        a.Name.toLocaleLowerCase().localeCompare(b.Name.toLocaleLowerCase()),
      )
    : [];

  const activeInstancesCount = instances?.filter((ele) => ele.State === 'running').length;
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
                {instances?.length} Instances: {activeInstancesCount} Running
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
