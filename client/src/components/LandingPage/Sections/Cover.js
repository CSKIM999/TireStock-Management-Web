import { Grid, Stack, Typography } from "@mui/material";
import * as React from "react";

function Cover() {
  return (
    <Grid item container justifyContent="center" alignItems="center">
      <Grid item xs={6}>
        <Stack>
          <Typography>BUTTON</Typography>
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Typography>SEARCH</Typography>
      </Grid>
    </Grid>
  );
}
export default Cover;
