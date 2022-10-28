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
          onChange={handleChange("tire")}
          disableGutters
          expanded={expanded === "tire"}
          sx={AccordionSX}
        >
          <AccordionSummary expandIcon={<ArrowUpward />}>
            <Typography>TIRE</Typography>
          </AccordionSummary>
          {accordionProps()}
          {/* <AccordionDetails>
            <Button variant="text" sx={AccordionButtonSX}>
              NEW
            </Button>
          </AccordionDetails>
          <AccordionDetails>
            <Button variant="text" sx={AccordionButtonSX}>
              USED
            </Button>
          </AccordionDetails> */}
        </Accordion>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <Accordion
          disableGutters
          sx={AccordionSX}
          expanded={expanded === "wheel"}
          onChange={handleChange("wheel")}
        >
          <AccordionSummary expandIcon={<ArrowUpward />}>
            <Typography>WHEEL</Typography>
          </AccordionSummary>
          {accordionProps()}
          {/* <AccordionDetails>
            <Button variant="text" sx={AccordionButtonSX}>
              NEW
            </Button>
          </AccordionDetails>
          <AccordionDetails>
            <Button variant="text" sx={AccordionButtonSX}>
              USED
            </Button>
          </AccordionDetails> */}
        </Accordion>
      </ListItem>
      <Divider />
      <ListItemButton sx={ListItemButtonSX}>
        <Typography>REPAIR</Typography>
      </ListItemButton>
    </List>
  );
}

export default SideBar;
