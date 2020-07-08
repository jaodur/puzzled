import { createMuiTheme } from '@material-ui/core/styles';

const materialUITheme = createMuiTheme({
    typography: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
    },
});

export { materialUITheme };
