import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('beby');
  const [outline, setOutline] = useState(true);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, outline, setOutline }}>
      {children}
    </ThemeContext.Provider>
  );
};