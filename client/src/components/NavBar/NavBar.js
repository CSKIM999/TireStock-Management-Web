import React from "react";
import { AppBar, Grid, Stack } from "@mui/material";
import NavRight from "./Sections/NavRight";
import NavLeft from "./Sections/NavLeft";

function NavBar(props) {
  return (
    <AppBar position="static" sx={{ alignItems: "center" }}>
      <Grid
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ maxWidth: props.maxWidth }}
        container
      >
        <Grid item xs={1}>
          <NavLeft />
        </Grid>
        <Grid item xs={11}>
          <NavRight />
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default React.memo(NavBar);
