// theme/CustomThemeProvider.js
import { ThemeProvider, CssBaseline } from '@mui/material';
import React from 'react';
import { getTheme } from './theme';

const CustomThemeProvider = ({ children, mode }) => {
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
