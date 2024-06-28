import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1440px',
};

const theme = extendTheme({
    breakpoints,
    styles: {
        global: {
            body: {
                bg: '#EEE6D8',
            },
        },
    },
});
export default theme;
