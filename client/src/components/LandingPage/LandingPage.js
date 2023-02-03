import React from "react";
import { Box, Grid } from "@mui/material";
import Cover from "./Sections/Cover";
import Items from "./Sections/Items";
import { useNavigate } from "react-router-dom";

function LandingPage(props) {
  const navigate = useNavigate();
  const sectionPosition = [6, 6];
  if (props.reset) {
    navigate("/");
  }
  return (
    <Box sx={{ height: "100%" }}>
      <Grid container direction="column" height="100%">
        <Cover position={sectionPosition[0]} />
        <Items position={sectionPosition[1]} />
      </Grid>
    </Box>
  );
}

export default LandingPage;
