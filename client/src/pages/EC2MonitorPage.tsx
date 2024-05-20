// /src/pages/EC2MonitorPage.tsx
import React from 'react';
import EC2Monitor from '../features/ec2Monitor/EC2Monitor';
import Header from '../features/common/Header';
import Footer from '../features/common/Footer';

const EC2MonitorPage: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <EC2Monitor />
      </main>
      <Footer />
    </div>
  );
};

export default EC2MonitorPage;
