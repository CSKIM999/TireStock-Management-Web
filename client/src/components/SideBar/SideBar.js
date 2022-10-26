import { ArrowUpward } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";

function SideBar() {
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <List className="sideBar" sx={{ mt: 5 }}>
      <Divider />
      <ListItemButton sx={{ justifyContent: "center", color: "primary" }}>
        <Typography>HOME</Typography>
      </ListItemButton>
      <Divider />
      <ListItem disablePadding>
        <Accordion
          onChange={handleChange("tire")}
          disableGutters
          expanded={expanded === "tire"}
          sx={{
            boxShadow: "none",
            width: "100%",
          }}
        >
          <AccordionSummary expandIcon={<ArrowUpward />}>
            <Typography>TIRE</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <Button
              variant="text"
              sx={{ p: 1, width: "100%", color: "primary" }}
            >
              NEW
            </Button>
          </AccordionDetails>
          <AccordionDetails sx={{ p: 0 }}>
            <Button variant="text" sx={{ p: 1, width: "100%" }}>
              USED
            </Button>
          </AccordionDetails>
        </Accordion>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <Accordion
          disableGutters
          sx={{ boxShadow: "none", m: 0, width: "100%" }}
          expanded={expanded === "wheel"}
          onChange={handleChange("wheel")}
        >
          <AccordionSummary expandIcon={<ArrowUpward />}>
            <Typography>WHEEL</Typography>
          </AccordionSummary>
          <AccordionDetails>NEW</AccordionDetails>
          <AccordionDetails>USED</AccordionDetails>
        </Accordion>
      </ListItem>
      <Divider />
      <ListItemButton sx={{ justifyContent: "center" }}>
        <Typography>REPAIR</Typography>
      </ListItemButton>
    </List>
  );
}

export default SideBar;
