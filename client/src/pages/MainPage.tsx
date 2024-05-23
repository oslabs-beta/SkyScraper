import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchEC2Instances,
  selectEC2Instances,
  selectEC2Status,
  selectEC2Error,
} from '../reducers/mainSlice';
// import MainMenu from '../components/utilities/MainMenu';
import { AppDispatch, RootState } from '../store';
// import EC2logo from '/Users/abel/skyscraper/client/src/assets/EC2.png';
// import { ReactComponent as Logo } from '../../assets/EC2logo.svg'
import EC2logo from '../assets/EC2logo';

const MainPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const instances = useSelector((state: RootState) => selectEC2Instances(state));
  const status = useSelector((state: RootState) => selectEC2Status(state));
  const error = useSelector((state: RootState) => selectEC2Error(state));
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

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div>
      <main>
        {/* <MainMenu /> */}
        <div id='title'>
          <h2>Main Page</h2>
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
          <div id='displayedinstances' style={{
              display: 'flex',
            flexWrap: 'wrap',
            }}>
            {sorted.map((instance: any) => (
              <Link className='link' to='/ec2' key={instance.InstanceId}>
                <div className='singleInstance' key={instance.InstanceId}>
                  <img src={EC2logo} width='35' height='35'></img>
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
