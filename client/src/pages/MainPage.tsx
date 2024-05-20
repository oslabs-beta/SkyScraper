// /src/pages/MainPage.tsx
// /src/pages/MainPage.tsx
import React from 'react';
import MainMenu from '../features/common/MainMenu';
import Header from '../features/common/Header';
import Footer from '../features/common/Footer';
import { Link } from 'react-router-dom';

const MainPage: React.FC = () => {
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
