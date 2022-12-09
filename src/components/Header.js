import React, { useContext } from 'react';
import '../styling/header.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import logo from '../ncnews_logo.png';

function Header() {
  const { user } = useContext(UserContext);
  return (
    <header className='header'>
      <Link className='header__logolink' to='/'>
        <img className='header__logo' src={logo} alt='nc news logo' />
      </Link>
      <Link className='header__userlink' to={user ? '/myaccount' : '/login'}>
        <img
          className='header__usericon'
          alt='user icon'
          src='https://cdn-icons-png.flaticon.com/512/747/747376.png'
        />
      </Link>
    </header>
  );
}

export default Header;
