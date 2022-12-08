import React, { createContext, useState, useEffect } from 'react';
import { getUsers } from '../api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
      setUsersLoading(false);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, users, setUsers, usersLoading, setUsersLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};
