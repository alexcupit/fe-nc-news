import { createContext, useState } from 'react';

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [err, setErr] = useState(null);

  return (
    <ErrorContext.Provider value={{ err, setErr }}>
      {children}
    </ErrorContext.Provider>
  );
};
