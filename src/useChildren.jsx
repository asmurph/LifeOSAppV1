import React, { createContext, useContext, useState } from 'react';

const ChildrenContext = createContext();

export const ChildrenProvider = ({ children }) => {
  const [activeChild, setActiveChild] = useState({ id: 'mockChild123', name: 'Johnny' });

  return (
    <ChildrenContext.Provider value={{ activeChild, setActiveChild }}>
      {children}
    </ChildrenContext.Provider>
  );
};

export const useChildren = () => {
  return useContext(ChildrenContext);
};
