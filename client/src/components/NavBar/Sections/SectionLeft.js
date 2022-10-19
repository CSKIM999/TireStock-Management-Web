import React from "react";
import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material";

const pages = ["MENU-1", "MENU-2", "MENU-3"];
function SectionLeft() {
  return (
    <Toolbar sx={{ p: 0 }}>
      <Typography component="a" href="/">
        LOGO
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton>MOBILE-MENU</IconButton>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button key={page} sx={{ my: 2, color: "white", display: "block" }}>
            {page}
          </Button>
        ))}
      </Box>
    </Toolbar>
  );
}

export default SectionLeft;
