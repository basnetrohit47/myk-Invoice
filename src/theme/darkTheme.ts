import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // Light blue color for dark theme
    },
   
    background:{
      default: "#363a3d", 
      paper:"#26282a",
    }
  },
  
  
});

export default darkTheme;
