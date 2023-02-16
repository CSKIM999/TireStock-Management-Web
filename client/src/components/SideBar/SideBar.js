import { ArrowUpward } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useLocation } from "react-router-dom";

function SideBar() {
  // TODO [redux 사용 현재탭관리]
  const path = useLocation().pathname;
  const [expanded, setExpanded] = React.useState(null);
  const [mainpathNow, setMainpathNow] = React.useState("");
  const [detailpathNow, setDetailpathNow] = React.useState("");
  React.useEffect(() => {
    const [_, mainPath, detailPath] = window.location.pathname.split("/");
    setMainpathNow(mainPath);
    setDetailpathNow(detailPath);
    if (mainPath) {
      switch (mainPath) {
        case "tires":
          setExpanded(mainPath);
          break;
        case "wheels":
          setExpanded(mainPath);
          break;
        default:
          break;
      }
    }
  }, [path, window.location.pathname]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const type = ["new", "used"];
  const sideItems = ["tires", "wheels"];

  const AccordionSX = { boxShadow: "none", m: 0, width: "100%" };

  const accordionProps = (prop) => {
    return (
      <React.Fragment>
        {type.map((item, index) => (
          <AccordionDetails key={index}>
            <Button
              className={`nav-Button user-Button ${
                prop === mainpathNow && item === detailpathNow
                  ? "navSelected-Button"
                  : ""
              }`}
              variant="text"
              sx={{
                p: 1,
                borderRadius: "0px",
                width: "100%",
              }}
              href={`/${prop}/${item}`}
            >
              {item.toUpperCase()}
            </Button>
          </AccordionDetails>
        ))}
      </React.Fragment>
    );
  };
  const accordionItem = sideItems.map((item, index) => (
    <React.Fragment key={index}>
      <ListItem disablePadding>
        <Accordion
          onChange={handleChange(item)}
          disableGutters
          expanded={expanded === item}
          sx={AccordionSX}
        >
          <AccordionSummary
            className="nav-Button"
            expandIcon={<ArrowUpward sx={{ color: "text.primary" }} />}
          >
            {item.toUpperCase()}
          </AccordionSummary>
          {accordionProps(item)}
        </Accordion>
      </ListItem>
      <Divider />
    </React.Fragment>
  ));
  return (
    <List
      className="sideBar"
      sx={{
        display: `${path === "/" ? "None" : "block"}`,
        mt: 5,
        pl: 3,
        minWidth: 120,
      }}
    >
      <Divider />
      <ListItemButton className="nav-Button" href="/">
        HOME
      </ListItemButton>
      <Divider />
      {accordionItem}
      <ListItemButton
        href="/requests"
        className={`nav-Button ${
          "requests" === mainpathNow ? "navSelected-Button" : ""
        }`}
      >
        REPAIR
      </ListItemButton>
    </List>
  );
}

export default React.memo(SideBar);
