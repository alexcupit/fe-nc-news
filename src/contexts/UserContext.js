import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);

  return (
    <UserContext.Provider
      value={{ user, setUser, users, setUsers, usersLoading, setUsersLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};
