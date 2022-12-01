import React from "react";
import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import { FlutterDash } from "@mui/icons-material";

function NavLeft() {
  return (
    <Toolbar sx={{ p: 0 }}>
      <Typography component="a" href="/">
        <FlutterDash sx={{ fontSize: 50 }} />
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton>MOBILE-MENU</IconButton>
      </Box>
    </Toolbar>
  );
}

export default NavLeft;
