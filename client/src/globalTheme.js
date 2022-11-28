import { createTheme } from "@mui/material/styles";
const bgColor = "#242424";
const ftColor = { main: "#cccccc", light: "#ffffff", dark: "#b3b3b3" }; //main-light-dark
const CardBgColor = "#333333";
const pointColor = "#FF8736";
const complementaryColor = "#02A9B3";

export const globalTheme = createTheme({
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: "0 !important",
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          ".ReqItem .MuiGrid-root": {
            display: "flex",
            justifyContent: "center",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          "& ::-webkit-scrollbar": {
            width: "0.4rem",
          },
          "& ::-webkit-scrollbar-track": {
            backgroundColor: pointColor,
            borderRadius: "10px",
          },
          "& ::-webkit-scrollbar-thumb": {
            backgroundColor: complementaryColor,
            borderRadius: "10px",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          "& ::-webkit-scrollbar": {
            width: ".7rem",
          },
          "& ::-webkit-scrollbar-track": {
            backgroundColor: pointColor,
            borderRadius: "10px",
          },
          "& ::-webkit-scrollbar-thumb": {
            backgroundColor: complementaryColor,
            border: "2px solid",
            borderColor: pointColor,
            borderRadius: "10px",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        caption: {
          color: ftColor.light + "!important",
        },
        h5: {
          color: ftColor.light,
        },
        subtitle1: {
          color: ftColor.dark + "!important",
        },
        subtitle2: {
          color: bgColor + "!important",
        },
        body1: {
          color: ftColor.light + "!important",
        },
        body2: {
          color: ftColor.light + "!important",
        },
        button: {
          color: ftColor.main,
        },
      },
    },
    MuiPickersArrowSwitcher: {
      styleOverrides: {
        button: {
          color: ftColor.main + "!important",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: ftColor.dark,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderColor: ftColor.dark,
          color: ftColor.dark,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          color: ftColor.main,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: CardBgColor,
        },
      },
    },
  },
  palette: {
    text: {
      primary: ftColor.main,
      secondary: ftColor.light,
      dark: bgColor,
    },
    background: {
      default: bgColor,
      paper: bgColor,
      info: complementaryColor,
    },
    primary: {
      main: pointColor,
    },
    secondary: {
      main: complementaryColor,
      dark: "#ea605d!important",
    },
    info: {
      main: ftColor.dark,
    },
    error: {
      main: "#ea605d",
    },
    success: {
      main: "#6fbf73",
    },
    divider: bgColor,
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
