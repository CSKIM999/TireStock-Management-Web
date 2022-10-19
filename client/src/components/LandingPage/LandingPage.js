import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import NavBar from "../NavBar/NavBar";
import ItemBox from "../ContentsPage/ItemBox";
import RepairBox from "../ContentsPage/RepairBox";

function LandingPage() {
  console.log("landing");
  return (
    <Box>
      <NavBar />
      <Typography>LANDING-PAGE</Typography>
      <Grid container>
        <Grid xs={12} md={8}>
          <ItemBox />
        </Grid>
        <Grid xs={12} md={4}>
          <RepairBox />
        </Grid>
      </Grid>
    </Box>
  );
}

export default LandingPage;
