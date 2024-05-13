import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import BurgerMenu from './containers/BurgerMenu';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' Component={Login} />
      </Routes>
      <BurgerMenu />
    </Router>
  );
};

export default App;
