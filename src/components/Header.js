import React, { useContext } from 'react';
import '../styling/header.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

function Header() {
  const { user } = useContext(UserContext);
  return (
    <header>
      <Link to='/'>NC NEWS</Link>
      <Link to={user ? '/myaccount' : '/login'}>
        <img
          className='header__img'
          src='https://cdn-icons-png.flaticon.com/512/747/747376.png'
        />
      </Link>
    </header>
  );
}

export default Header;
