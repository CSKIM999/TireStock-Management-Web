import React from "react";
import { AppBar, Stack } from "@mui/material";
import SectionRight from "./Sections/SectionRight";
import SectionLeft from "./Sections/SectionLeft";

function NavBar() {
  return (
    <AppBar position="static">
      <Stack direction="row" justifyContent="space-between">
        <SectionLeft />
        <SectionRight />
      </Stack>
    </AppBar>
  );
}

export default NavBar;
