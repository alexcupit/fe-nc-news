import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import '../styling/login.css';

function LogIn() {
  const { setUser, user, users, usersLoading } = useContext(UserContext);

  if (user) {
    return <Navigate to='/myaccount' />; //should use redirect instead?
  } else if (usersLoading) {
    return (
      <div className='usersloading'>
        <p>Loading...</p>;
        <img
          className='usersloading__img'
          src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9bec1a23-0f79-4beb-ba99-757df5ff5c1e/dbt1p6j-55e808cd-367a-4b56-937c-cfba70169bdf.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzliZWMxYTIzLTBmNzktNGJlYi1iYTk5LTc1N2RmNWZmNWMxZVwvZGJ0MXA2ai01NWU4MDhjZC0zNjdhLTRiNTYtOTM3Yy1jZmJhNzAxNjliZGYuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-RGrnAcvtCpAf0CP-ZZ6nEjAPpp-TPWPvIuFzWn3_64'
          alt='Mr Bump loading GIF'
        />
      </div>
    );
  } else {
    return (
      <main className='login'>
        <h1>Log In</h1>
        <p>
          Please choose from one of the existing users below to use this site as
          an authenticated user:
        </p>
        <div className='users-container'>
          {users.map((user) => {
            const { username, name, avatar_url } = user;
            return (
              <div className='usercard' key={username}>
                <img
                  src={avatar_url}
                  alt='user avatar'
                  className='usercard__img'
                />
                <h3 className='usercard__name'>{name}</h3>
                <h4 className='usercard__username'>{username}</h4>
                <button
                  onClick={() => {
                    setUser(user);
                  }}
                  className='usercard__button'
                >
                  Log In
                </button>
              </div>
            );
          })}
        </div>
      </main>
    );
  }
}

export default LogIn;
