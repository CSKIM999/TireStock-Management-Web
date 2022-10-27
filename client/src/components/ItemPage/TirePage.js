import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import SideBar from "../SideBar/SideBar";
import ItemOption from "../modules/ItemOption";

function TirePage() {
  return (
    <Grid container direction="column">
      <Grid item xs={2}>
        <Typography>HI</Typography>
        <Grid container direction="row">
          <Grid
            item
            flexGrow={1}
            sx={{ display: { xs: "none", md: "flex" } }}
            md={1.5}
          >
            <ItemOption />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography>TEST</Typography>
      </Grid>
    </Grid>
  );
}

export default TirePage;
