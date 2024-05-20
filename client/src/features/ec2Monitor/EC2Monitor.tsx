// /src/features/ec2Monitor/EC2Monitor.tsx
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../app/store';
// import {
//   fetchEC2InstancesStart,
//   fetchEC2InstancesSuccess,
//   fetchEC2InstancesFailure,
//   selectEC2Instances,
// } from './ec2MonitorSlice';

// const EC2Monitor: React.FC = () => {
//   const dispatch = useDispatch();
//   const instances = useSelector((state: RootState) => selectEC2Instances(state));

//   useEffect(() => {
//     const fetchData = async () => {
//       dispatch(fetchEC2InstancesStart());

//       try {
//         const response = await fetch('/ec2');
//         const data = await response.json();
//         dispatch(fetchEC2InstancesSuccess(data));
//       } catch (error) {
//         if (error instanceof Error) {
//           dispatch(fetchEC2InstancesFailure(error.toString()));
//         } else {
//           dispatch(fetchEC2InstancesFailure('An unknown error occurred'));
//         }
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   return (
//     <div>
//       <h1>EC2 Monitor</h1>
//       {instances.map((instance) => (
//         <div key={instance.id}>
//           <h2>{instance.name}</h2>
//           {/* Render instance metrics and details */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default EC2Monitor;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchEC2Instances, selectEC2Instances } from './ec2MonitorSlice';

const EC2Monitor: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const instances = useSelector((state: RootState) => selectEC2Instances(state));

  useEffect(() => {
    dispatch(fetchEC2Instances());
  }, [dispatch]);

  return (
    <div>
      <h1>EC2 Monitor</h1>
      {instances.map((instance) => (
        <div key={instance.InstanceId}>
          <h2>{instance.Name}</h2>
          {/* Render instance metrics and details */}
        </div>
      ))}
    </div>
  );
};

export default EC2Monitor;
