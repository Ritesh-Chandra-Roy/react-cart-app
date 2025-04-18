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
        defaultProps: {
            variantMapping: {
                h1: 'h2',
                h2: 'h2',
                h3: 'h2',
                h4: 'h2',
                h5: 'h2',
                h6: 'h2',
                subtitle1: 'h2',
                subtitle2: 'h2',
                body1: 'span',
                body2: 'span',
            },
        },
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
