import { createTheme } from "@mui/material/styles";

const bgColor = "#242424";
const ftColor = { main: "#cccccc", light: "#ffffff", dark: "#b3b3b3" }; //main-light-dark
const CardBgColor = "#333333";
const errorColor = "#ea605d";
const successColor = "#6fbf73";
const pointColor = "#FF8736";
const complementaryColor = "#02A9B3";

export const globalTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active  {
          -webkit-box-shadow: 0 0 0 100px ${bgColor} inset !important;
          -webkit-text-fill-color: ${ftColor.main}
        }
      `,
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          // pointerEvents: "none",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {},
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          padding: 0,
          borderBottomLeftRadius: "0px",
          cursor: "pointer",
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
          ".mainContents": {
            maxWidth: "1600px !important",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderRight: "0px !important",
          "& ::-webkit-scrollbar": {
            width: "0.4rem",
          },
          "& ::-webkit-scrollbar-track": {
            // backgroundColor: pointColor,
            backgroundColor: "#FF82264d",
            borderRadius: "10px",
          },
          "& ::-webkit-scrollbar-thumb": {
            backgroundColor: pointColor,
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
          ".success fieldset": {
            border: "2px solid",
            borderColor: successColor,
          },
          ".success label": {
            color: successColor,
          },
          ".postingOption *": {
            textAlign: "center",
          },
          "&.coverSearch": {
            backgroundColor: "#242424CC",
          },
          "&.coverSearch .MuiGrid-container": {
            alignItems: "center",
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
      default: pointColor,
      main: pointColor,
    },
    secondary: {
      main: complementaryColor,
      dark: "#ea605d !important",
    },
    info: {
      main: ftColor.dark,
    },
    error: {
      main: errorColor,
    },
    success: {
      main: successColor,
    },
    divider: pointColor,
  },
  typography: {
    fontFamily: [
      "Noto Sans KR",
      "Inter",
      // "Inter",
      // "-apple-system",
      // "BlinkMacSystemFont",
      // '"Segoe UI"',
      // "Roboto",
      // '"Helvetica Neue"',
      // "Arial",
      "sans-serif",
      // '"Apple Color Emoji"',
      // '"Segoe UI Emoji"',
      // '"Segoe UI Symbol"',
    ].join(","),
  },
});
