import React from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";

const pages = ["MENU-1", "MENU-2", "MENU-3"];
function NavBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="100%">
        <Toolbar>
          <Typography component="a" href="/">
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton>MOBILE-MENU</IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <IconButton>WEB-MENU</IconButton>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
