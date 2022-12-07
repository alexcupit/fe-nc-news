import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import '../styling/myAccount.css';

function MyAccount() {
  const { user, setUser } = useContext(UserContext);

  if (!user) {
    return <Navigate to='/login' />;
  } else {
    const { name, username, avatar_url } = user;
    return (
      <main className='myaccount'>
        <h2 className='myaccount__title'>My Account</h2>
        <img className='myaccount__img' src={avatar_url} alt='user avaar' />
        <h3 className='myaccount__name'>{name}</h3>
        <h4 className='myaccount__username'>{username}</h4>
        <button
          onClick={() => {
            setUser(null);
          }}
          className='myaccount__button'
        >
          Log Out
        </button>
      </main>
    );
  }
}

export default MyAccount;
