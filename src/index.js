import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CustomThemeProvider from './theme/CustomThemeProvider';

const Root = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <CustomThemeProvider mode={isDarkMode ? 'dark' : 'light'}>
      <App isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode((prev) => !prev)} />
    </CustomThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
