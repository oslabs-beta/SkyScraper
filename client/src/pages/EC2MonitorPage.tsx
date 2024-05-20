// /src/pages/EC2MonitorPage.tsx
// import React from 'react';
// import EC2Monitor from '../features/ec2Monitor/EC2Monitor';
// import Header from '../features/common/Header';
// import Footer from '../features/common/Footer';

// const EC2MonitorPage: React.FC = () => {
//   return (
//     <div>
//       <Header />
//       <main>
//         <EC2Monitor />
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default EC2MonitorPage;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEC2Instances,
  selectEC2Instances,
  selectEC2Status,
  selectEC2Error,
} from '../features/ec2Monitor/ec2MonitorSlice';
import EC2InstanceDetail from '../features/ec2Monitor/EC2InstanceDetail';
import Header from '../features/common/Header';
import Footer from '../features/common/Footer';
import { AppDispatch, RootState } from '../app/store';

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
      <Header />
      <main>
        <h1>EC2 Monitor</h1>
        {instances.map((instance) => (
          <EC2InstanceDetail key={instance.InstanceId} instance={instance} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default EC2MonitorPage;
