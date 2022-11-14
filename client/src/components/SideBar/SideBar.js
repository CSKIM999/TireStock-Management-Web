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
  const AccordionButtonSX = { p: 1, width: "100%" };
  const ListItemButtonSX = { justifyContent: "center", color: "primary" };
  const AccordionSX = { boxShadow: "none", m: 0, width: "100%" };
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const type = ["NEW", "USED"];
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
  return (
    <List className="sideBar" sx={{ mt: 5 }}>
      <Divider />
      <ListItemButton sx={ListItemButtonSX}>
        <Typography>HOME</Typography>
      </ListItemButton>
      <Divider />
      <ListItem disablePadding>
        <Accordion
          onChange={handleChange("tires")}
          disableGutters
          expanded={expanded === "tires"}
          sx={AccordionSX}
        >
          <AccordionSummary expandIcon={<ArrowUpward />}>
            <Typography>TIRES</Typography>
          </AccordionSummary>
          {accordionProps()}
        </Accordion>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <Accordion
          disableGutters
          sx={AccordionSX}
          expanded={expanded === "wheels"}
          onChange={handleChange("wheels")}
        >
          <AccordionSummary expandIcon={<ArrowUpward />}>
            <Typography>WHEELS</Typography>
          </AccordionSummary>
          {accordionProps()}
        </Accordion>
      </ListItem>
      <Divider />
      <ListItemButton sx={ListItemButtonSX}>
        <Typography>REPAIR</Typography>
      </ListItemButton>
    </List>
  );
}

export default React.memo(SideBar);
