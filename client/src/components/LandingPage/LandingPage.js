import React from "react";
import { Box, Typography } from "@mui/material";
import NavBar from "./utils/NavBar";

function LandingPage() {
  console.log("landing");
  return (
    <Box>
      <NavBar />
      <Typography>LANDING-PAGE</Typography>
    </Box>
  );
}

export default LandingPage;
