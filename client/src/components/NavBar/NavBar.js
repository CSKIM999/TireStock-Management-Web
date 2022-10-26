import React from "react";
import { AppBar, Stack } from "@mui/material";
import NavRight from "./Sections/NavRight";
import NavLeft from "./Sections/NavLeft";

function NavBar() {
  return (
    <AppBar position="static">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <NavLeft />
        <NavRight />
      </Stack>
    </AppBar>
  );
}

export default NavBar;
