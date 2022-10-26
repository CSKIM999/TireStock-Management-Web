import { Divider, Grid, Stack, Typography } from "@mui/material";
import * as React from "react";

function Items() {
  return (
    <React.Fragment>
      <Grid
        item
        container
        alignItems="center"
        direction="column"
        xs={12}
        md={4}
      >
        <Grid item xs={1} sx={{ background: "red", width: "100%" }}>
          <Typography align="center">TIRES</Typography>
        </Grid>
        <Divider />
        <Grid item>
          <Stack direction="row">
            <Typography>NEW Item</Typography>
            <Typography>USED Item</Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid item xs={12} md={5}>
        <Typography>WHEELS</Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography>MAPS</Typography>
      </Grid>
    </React.Fragment>
  );
}

export default Items;
