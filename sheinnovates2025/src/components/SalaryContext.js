// SalaryContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the context
const SalaryContext = createContext();

// Custom hook to use the context
export const useSalary = () => {
  return useContext(SalaryContext);
};

// Provider component to wrap the app
export const SalaryProvider = ({ children }) => {
  const [medSalary, setMedSalary] = useState(null);

  return (
    <SalaryContext.Provider value={{ medSalary, setMedSalary }}>
      {children}
    </SalaryContext.Provider>
  );
};
