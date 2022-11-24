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

function SideBar() {
  // TODO [redux 사용 현재탭관리]
  const [expanded, setExpanded] = React.useState(null);
  const [pathNow, setPathNow] = React.useState("");
  React.useEffect(() => {
    setPathNow(window.location.pathname);
    console.log(pathNow === "/request");
    const [blnk, mainPath, detailPath] = window.location.pathname.split("/");
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
  }, [window.location.pathname]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const type = ["new", "used"];
  const sideItems = ["tires", "wheels"];

  const ListItemButtonSX = {
    justifyContent: "center",
    color: "primary",
  };
  const AccordionSX = { boxShadow: "none", m: 0, width: "100%" };

  const accordionProps = (prop) => {
    return (
      <React.Fragment>
        {type.map((item, index) => (
          <AccordionDetails key={index}>
            <Button
              variant="text"
              sx={{
                p: 1,
                width: "100%",
                color:
                  `/${prop}/${item}` === pathNow ? "white" : "primary.main",
                bgcolor:
                  `/${prop}/${item}` === pathNow
                    ? "primary.main"
                    : "background.default",
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
          <AccordionSummary expandIcon={<ArrowUpward />}>
            <Typography>{item.toUpperCase()}</Typography>
          </AccordionSummary>
          {accordionProps(item)}
        </Accordion>
      </ListItem>
      <Divider />
    </React.Fragment>
  ));
  return (
    <List className="sideBar" sx={{ mt: 5 }}>
      <Divider />
      <ListItemButton sx={ListItemButtonSX}>
        <Typography>HOME</Typography>
      </ListItemButton>
      <Divider />
      {accordionItem}
      <ListItemButton
        href="/request"
        sx={{
          ...ListItemButtonSX,
          bgcolor: `${
            "/request" === pathNow ? "primary.main" : "background.default"
          }`,
        }}
      >
        <Typography>REPAIR</Typography>
      </ListItemButton>
    </List>
  );
}

export default React.memo(SideBar);
