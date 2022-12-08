import { createContext, useState, useEffect } from 'react';
import { getTopics } from '../api';

export const TopicsContext = createContext();

export const TopicsProvider = ({ children }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  return (
    <TopicsContext.Provider value={{ topics, setTopics }}>
      {children}
    </TopicsContext.Provider>
  );
};
