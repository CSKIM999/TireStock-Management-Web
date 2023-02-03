import { Divider, Grid, Stack, Typography } from "@mui/material";
import * as React from "react";

function Items({ postion }) {
  const tireSection = () => {
    return (
      <>
        <Grid item xs={4} sx={{ background: "red", width: "100%" }}>
          <Typography align="center">TIRES</Typography>
        </Grid>
        <Divider />
        <Grid item>
          <Stack direction="row">
            <Typography>NEW Item</Typography>
            <Typography>USED Item</Typography>
          </Stack>
        </Grid>
      </>
    );
  };

  const wheelSection = () => {
    return (
      <>
        <Typography>WHEELS</Typography>
      </>
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
      <Grid item container alignItems="center" direction="column" xs={4}>
        {tireSection()}
      </Grid>
      <Grid item xs={5}>
        {wheelSection()}
      </Grid>
      <Grid item xs={3}>
        {mapSection()}
      </Grid>
    </Grid>
  );
}

export default Items;
