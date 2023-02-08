import { Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import * as React from "react";
import PreviewItems from "../utils/PreviewItems";

function Items({ postion }) {
  const tireSection = () => {
    return (
      <Grid item sx={{ width: "100%" }}>
        <Paper elevation={12}>
          <Typography align="center">TIRES</Typography>
          <Stack direction="row" justifyContent="space-around" sx={{ p: 2 }}>
            {PreviewItems("tires", "used")}
            {PreviewItems("tires", "new")}
          </Stack>
        </Paper>
      </Grid>
    );
  };

  const wheelSection = () => {
    return (
      <Grid item sx={{ width: "100%" }}>
        <Paper elevation={12}>
          <Typography align="center">WHEELS</Typography>
          <Stack direction="row" justifyContent="space-around" sx={{ p: 2 }}>
            {PreviewItems("wheels", "used")}
            {PreviewItems("wheels", "new")}
          </Stack>
        </Paper>
      </Grid>
    );
  };
  const mapSection = () => {
    return (
      <>
        <Typography>MAPS</Typography>
      </>
    );
  };
  return (
    <Grid item container xs={postion}>
      <Grid
        item
        container
        alignItems="center"
        direction="column"
        md={5}
        lg={4}
        sx={{ minWidth: "33rem" }}
      >
        {tireSection()}
      </Grid>
      <Grid item md={5} lg={5} sx={{ minWidth: "33rem" }}>
        {wheelSection()}
      </Grid>
      <Grid item md="auto" lg="auto">
        {mapSection()}
      </Grid>
    </Grid>
  );
}

export default Items;
