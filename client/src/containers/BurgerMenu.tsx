// import React from 'react';

// import { useDispatch } from 'react-redux';
// import { toggleMenu } from '../reducers/burgerMenuSlicer';
// import { RootState } from '../store';
// import { useSelector } from 'react-redux';

// const BurgerMenu = () => {
//   const dispatch = useDispatch();
//   const isOpen = useSelector((state: RootState) => state.burgerMenu.isOpen);
//   return (
//     <button className='burger-menu-button' onClick={() => dispatch(toggleMenu())}>
//       <ion-icon name='menu-outline'></ion-icon>
//       <div className={isOpen ? 'burger-menu' : 'burger-menu-on'}>
//         <a href='https://chat.openai.com/'>This is a sample</a>
//         <a href='https://chat.openai.com/'>This is a sample</a>
//         <a href='https://chat.openai.com/'>This is a sample</a>
//       </div>
//     </button>
//   );
// };
// export default BurgerMenu;

import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../reducers/burgerMenuSlicer'; // Adjust the path as necessary

const BurgerMenu = () => {
  const dispatch = useDispatch();

  return (
    <button className='burger-menu-button' onClick={() => dispatch(toggleMenu())}>
      {/* <ion-icon name='menu-outline'></ion-icon> */}
      {/* Additional menu content */}
    </button>
  );
};

export default BurgerMenu;
