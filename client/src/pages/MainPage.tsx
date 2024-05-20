// /src/pages/MainPage.tsx
// import React from 'react';
// import MainMenu from '../features/common/MainMenu';
// import Header from '../features/common/Header';
// import Footer from '../features/common/Footer';
// import { Link } from 'react-router-dom';

// const MainPage: React.FC = () => {
//   return (
//     <div>
//       <Header />
//       <main>
//         <MainMenu />
//         <div>
//           <h2>MVP Feature</h2>
//           <Link to='/ec2-monitor'>
//             <button>EC2: 10 instances, 2 running</button>
//           </Link>
//           <h2>Other Services</h2>
//           <Link to='/lambda-monitor'>
//             <button>Lambda: 1 instance, none running</button>
//           </Link>
//           <Link to='/sqs-monitor'>
//             <button>SQS: 1 instance, none running</button>
//           </Link>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default MainPage;

//latest working one bewlow
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchEC2Instances,
  selectEC2Instances,
  selectEC2Status,
  selectEC2Error,
} from '../features/ec2Monitor/ec2MonitorSlice';
import MainMenu from '../features/common/MainMenu';
import Header from '../features/common/Header';
import Footer from '../features/common/Footer';
import { AppDispatch, RootState } from '../app/store';

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
      <Header />
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
          {instances.map((instance) => (
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
      <Footer />
    </div>
  );
};

export default MainPage;

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchInstances } from './ec2MonitorSlice';
// import { RootState } from './rootReducer';

// const MainPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const { instances, loading, error } = useSelector((state: RootState) => state.ec2Monitor);

//   useEffect(() => {
//     dispatch(fetchInstances());
//   }, [dispatch]);

//   return (
//     <div>
//       <h1>Main Page</h1>
//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}
//       <ul>
//         {instances.map((instance) => (
//           <li key={instance.InstanceId}>
//             <p>ID: {instance.InstanceId}</p>
//             <p>Type: {instance.InstanceType}</p>
//             <p>Name: {instance.Name}</p>
//             <p>State: {instance.State}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MainPage;
