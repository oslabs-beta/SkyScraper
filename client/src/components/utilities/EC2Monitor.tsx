import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchEC2Instances, selectEC2Instances } from '../../reducers/mainSlice';

const EC2Monitor: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const instances = useSelector((state: RootState) => selectEC2Instances(state));

  useEffect(() => {
    dispatch(fetchEC2Instances());
  }, [dispatch]);

  return (
    <div>
      <h1>EC2 Monitor</h1>
      {instances.map((instance: any) => (
        <div key={instance.InstanceId}>
          <h2>{instance.Name}</h2>
          {/* Render instance metrics and details */}
        </div>
      ))}
    </div>
  );
};

export default EC2Monitor;
