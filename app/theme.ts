"use client";

import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            border: "1px solid",
            width: "15px",
            height: "55px",
            backgroundColor: "#408A71",
          },
        },
      ],
    },
  },
  palette: {
    primary: {
      main: '#00000'
    }
  }
});

export default theme;
