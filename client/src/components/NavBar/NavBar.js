import React from "react";
import { AppBar, Grid, Stack } from "@mui/material";
import NavRight from "./Sections/NavRight";
import NavLeft from "./Sections/NavLeft";

function NavBar(props) {
  return (
    <AppBar
      position="static"
      sx={{
        alignItems: "center",
        height: "auto",
      }}
    >
      <Grid
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={props.SX}
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
