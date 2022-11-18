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
  React.useEffect(() => {
    console.log(window.location.pathname);
  }, [window.location.pathname]);

  const AccordionButtonSX = { p: 1, width: "100%" };
  const ListItemButtonSX = { justifyContent: "center", color: "primary" };
  const AccordionSX = { boxShadow: "none", m: 0, width: "100%" };
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const type = ["NEW", "USED"];
  const sideItems = ["tires", "wheels"];
  function accordionProps() {
    return (
      <React.Fragment>
        {type.map((item, index) => (
          <AccordionDetails key={index}>
            <Button variant="text" sx={AccordionButtonSX}>
              {item}
            </Button>
          </AccordionDetails>
        ))}
      </React.Fragment>
    );
  }
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
          {accordionProps()}
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
      <ListItemButton sx={ListItemButtonSX}>
        <Typography>REPAIR</Typography>
      </ListItemButton>
    </List>
  );
}

export default React.memo(SideBar);
