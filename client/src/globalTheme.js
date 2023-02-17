import { createTheme } from "@mui/material/styles";

const bgColor = "#001C2D";
const ftColor = { main: "#cccccc", light: "#ffffff", dark: "#b3b3b3" }; //main-light-dark
const thirdColor = "#DBDAC1";
const errorColor = "#ea605d";
const successColor = "#6fbf73";
const pointColor = "#FEA800";
const complementaryColor = "#0568A6";

// #001C2D 남색
// #F41F0D 주황
// #FEA800 노랑
// #FFFFFF 흰
// #DBDAC1 오트밀

export const globalTheme = createTheme({
  components: {
    // root 밑에 바로 MuiStack-root 가 있어서 사실상의 root 처럼 사용 가능.
    MuiStack: {
      styleOverrides: {
        root: {
          ".full": {
            width: "100%",
            height: "100%",
          },
          ".pb2": {
            paddingBottom: "1rem",
          },
          ".pt2": {
            paddingTop: "1rem",
          },
          ".ls4": {
            letterSpacing: 4,
          },
          ".Plevel1": {
            backgroundColor: pointColor + "11",
          },
          ".Plevel2": {
            backgroundColor: pointColor + "22",
          },
          ".br0": {
            borderRadius: 0,
          },
          ".br3": {
            borderRadius: 0,
          },
          ".aic": {
            display: "flex",
            alignItems: "center",
          },
          ".jcsb": {
            display: "flex",
            justifyContent: "space-between",
          },
          ".bp1": {
            border: "1px solid" + pointColor,
            borderRadius: 5,
          },
          ".fwb": {
            fontWeight: "bold",
          },
          ".divPy1": {
            paddingTop: "0.5rem",
            marginBottom: "0.5rem",
          },
          ".optionSet-root": {
            padding: "0.5rem",
            borderRadius: "0.5rem",
            backgroundColor: bgColor + "77",
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        root: {
          "&.useAccountMenu *": {
            color: bgColor,
            fontWeight: "bold",
          },
          "&.useAccountMenu .MuiList-root": {
            padding: 5,
            backgroundColor: thirdColor,
          },
        },
      },
    },
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
          "&.arrow-Button": {
            color: ftColor.main,
          },
          "&.sidebar-Accordion": {
            justifyContent: "space-between",
          },
          "&.sidebar-Accordion .MuiAccordionSummary-content": {
            flexGrow: 0,
          },
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
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.coverSearch-Button": {
            fontWeight: "bold",
          },
          "&.nav-Button": {
            fontWeight: "bold",
          },
          "&.arrow-Button": {
            color: ftColor.main + "!important",
          },
          "&.user-Button": {
            color: thirdColor,
          },
          "&.navSelected-Button": {
            backgroundColor: pointColor + "!important",
            color: bgColor,
          },
          "&.Mui-selected": {
            fontWeight: "bold",
          },
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
          ".card-Grid:hover": {
            transform: "scale(1.08)",
            transition: "transform 150ms",
          },
          ".card-Grid": {
            height: "11rem",
            border: "1px solid",
            borderColor: ftColor.main + "22",
            padding: 5,
            borderRadius: 10,
          },
          ".dummy": {
            border: 0,
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
          ".Mui-selected": {
            fontSize: "1.1rem",
            transition: "font-size 100ms",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          "&.full": {
            width: "100%",
            height: "100%",
          },
          "&.preview": { backgroundColor: pointColor + "11" },
          "&.preview a:hover": {
            transform: "scale(1.03)",
            transition: "transform 100ms",
          },
          "&.itemBoard-Paper": {
            backgroundColor: pointColor + "11",
            borderRadius: 0,
          },
          "& ::-webkit-scrollbar": {
            width: "0.4rem",
          },
          "& ::-webkit-scrollbar-track": {
            // backgroundColor: pointColor,
            backgroundColor: pointColor + "33",
            borderRadius: "10px",
          },
          "& ::-webkit-scrollbar-thumb": {
            backgroundColor: pointColor + "DD",
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
          "&.coverSearch-Paper": {
            backgroundColor: "#242424CC",
          },
          "&.coverSearch-Paper .MuiGrid-container": {
            alignItems: "center",
          },
          "&.navFAQ-Paper": {
            backgroundColor: pointColor + "22",
            justifyContent: "center",
            borderRadius: 40,
          },
          "&.bodyFAQ-Paper": {
            backgroundColor: pointColor + "11",
            borderRadius: 0,
            maxHeight: 650,
          },
          "&.emptyItem-Paper": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "inherit",
            fontSize: "3rem",
            fontWeight: "bold",
          },
          "&.itemDetail-Paper": {
            backgroundColor: pointColor + "11",
            borderRadius: 10,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        caption: {
          color: ftColor.dark,
        },
        h5: {
          color: ftColor.light,
        },
        h6: {
          color: ftColor.light,
        },
        subtitle1: {
          color: ftColor.dark,
        },
        subtitle2: {
          color: bgColor,
        },
        body1: {
          color: ftColor.light,
        },
        body2: {
          color: ftColor.light,
        },
        button: {
          color: ftColor.main,
        },
        root: {
          "&.previewTitle": {
            color: ftColor.light + "!important",
            fontSize: "1.2rem",
            fontWeight: "bold",
            paddingTop: "10px",
          },
          "&.previewCard": {
            color: ftColor.light + "!important",
            fontWeight: "bold",
          },
          "&.crumb-Typo": {
            color: pointColor,
            fontWeight: "900",
            letterSpacing: "5px",
          },
          "&.detailTitle-Typo": {
            color: pointColor,
            fontSize: "1.5rem",
            fontWeight: "bold",
          },
          "&.modalTitle-Typo": {
            display: "flex",
            alignItems: "center",
            paddingTop: "1.5rem",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: bgColor,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.comment *": {
            borderColor: pointColor + "!important",
          },
        },
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
    // MuiCard: {
    //   styleOverrides: {
    //     root: {
    //       // background: CardBgColor,
    //     },
    //   },
    // },
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
    error: {
      main: errorColor,
    },
    success: {
      main: successColor,
    },
    divider: pointColor,
  },
  typography: {
    fontFamily: ["Noto Sans KR", "Inter", "sans-serif"].join(","),
  },
});
