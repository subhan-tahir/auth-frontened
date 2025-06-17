import React, { createContext, useState, useEffect } from 'react';

// Create a context for the theme
export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // Get the theme from localStorage or default to light
  const [theme, setTheme] = useState(localStorage.getItem("app-theme") || "light");

  // Update localStorage and apply theme class to body
  useEffect(() => {
    localStorage.setItem("app-theme", theme);
    document.body.classList.remove("light", "dark"); // Remove previous theme classes
    document.body.classList.add(theme);

    // Optional: Apply basic styles via CSS classes instead of direct manipulation
    // These can be defined in a global CSS file
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;