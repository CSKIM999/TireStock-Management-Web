import React from "react";
import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import { Home } from "@mui/icons-material";

function NavLeft() {
  return (
    <Toolbar sx={{ p: 0 }}>
      <Typography component="a" href="/">
        <Home sx={{ fontSize: 40 }} />
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton>MOBILE-MENU</IconButton>
      </Box>
    </Toolbar>
  );
}

export default NavLeft;
