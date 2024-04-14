// Create a theme.js file and define your color palette
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e84a5f', // Reddish pink color
    },
    secondary: {
      main: '#3f51b5', // Royal blue color
    },
    background: {
      default: '#f8f8f8', // Light gray background color
    },
  },
});

export default theme;
