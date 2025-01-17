import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // Blue color for primary theme
    },
    secondary: {
        main: "#c2185b", // Customize secondary color if needed
      },
    background:{
      default: "#f8fcfe", 
      paper:"white"
    }
     
   
  },
  
});

export default lightTheme;
