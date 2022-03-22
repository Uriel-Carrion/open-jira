import { createTheme } from "@mui/material";
import { red, grey } from '@mui/material/colors';

export const darkTheme = createTheme({
  palette: {
    
    mode: "dark",
    background: {
      default: grey[700],
  
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },

  components: {
    MuiAppBar: {
      defaultProps: {
        elevation:0
      },
      styleOverrides: {
        root: {
          backgroundColor: "rgb(0, 127, 255)",
        },
      },
    },
  },
});
