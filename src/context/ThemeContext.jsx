import React, { createContext, useState, useEffect } from 'react';

// // Create a context for the theme
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Get the theme from localStorage or default to light
  const [theme, setTheme] = useState(localStorage.getItem("app-theme") || "light");

  // Update localStorage and body class when the theme changes
  useEffect(() => {
    localStorage.setItem("app-theme", theme);
  
   if (theme === 'dark') {
    document.body.style.backgroundColor = '#000000'; 
    document.body.style.color = '#ffffff'; 
  } else {
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#000000'; 
  }
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

