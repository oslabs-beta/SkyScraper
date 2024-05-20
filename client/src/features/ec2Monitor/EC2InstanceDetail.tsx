// /src/features/ec2Monitor/EC2InstanceDetail.tsx
import React from 'react';

interface EC2InstanceDetailProps {
  instance: {
    id: string;
    name: string;
    // add other necessary fields
  };
}

const EC2InstanceDetail: React.FC<EC2InstanceDetailProps> = ({ instance }) => {
  return (
    <div>
      <h2>{instance.name}</h2>
      <p>ID: {instance.id}</p>
      {/* Render other instance details */}
    </div>
  );
};

export default EC2InstanceDetail;
