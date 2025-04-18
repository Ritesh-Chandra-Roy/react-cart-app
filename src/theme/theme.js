// theme/theme.js
import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#9c27b0',
        },
    },
    typography: {
        fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    textTransform: 'none',
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    padding: '6px',
                },
            },
        },
    },
});

export const getTheme = (mode = 'dark') => createTheme(getDesignTokens(mode));
