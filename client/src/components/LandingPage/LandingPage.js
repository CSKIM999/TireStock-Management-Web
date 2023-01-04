import React from "react";
import { Box, Grid } from "@mui/material";
import Cover from "./Sections/Cover";
import Items from "./Sections/Items";
import { useNavigate } from "react-router-dom";

function LandingPage(props) {
  const navigate = useNavigate();
  console.log("landing", props);
  if (props.reset) {
    console.log("reset!");
    navigate("/");
  }
  return (
    <Box sx={{ height: "100%" }}>
      <Grid container direction="column" height="100%">
        {/* COVER */}
        <Grid item xs={6}>
          <Cover />
        </Grid>

        <Grid item container xs={4} sx={{ px: 5 }}>
          <Items />
        </Grid>

        {/* ITEMS */}
      </Grid>
    </Box>
  );
}

export default LandingPage;
