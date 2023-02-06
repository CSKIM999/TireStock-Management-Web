import { Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
const PaperSX = {
  width: "100%",
  height: "100%",
};
function CoverLeft({ coverPosition }) {
  return (
    <Grid item xs={coverPosition[0]}>
      <Paper sx={PaperSX}>
        <Stack>
          <Typography>BUTTON</Typography>
        </Stack>
      </Paper>
    </Grid>
  );
}

export default CoverLeft;
