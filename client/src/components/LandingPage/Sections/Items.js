import { Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import Kakao from "../../modules/Kakao";
import * as React from "react";
import PreviewItems from "../utils/PreviewItems";

function Items({ postion }) {
  const tireSection = () => {
    return (
      <Grid item sx={{ width: "100%" }}>
        <Paper className="preview" elevation={0}>
          <Typography align="center" className="previewTitle">
            TIRES
          </Typography>
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
        <Paper className="preview" elevation={0}>
          <Typography className="previewTitle" align="center">
            WHEELS
          </Typography>
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
      <Paper className="preview" elevation={0} sx={{ height: "100%" }}>
        <Stack spacing={2} sx={{ height: "100%", alignItems: "center" }}>
          <Typography className="previewTitle">MAP</Typography>
          <Kakao />
        </Stack>
      </Paper>
    );
  };
  return (
    <Grid item container xs={postion} sx={{ justifyContent: "space-between" }}>
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
      <Grid item md={5} lg={4} sx={{ minWidth: "33rem" }}>
        {wheelSection()}
      </Grid>
      <Grid item md="auto" lg={3.3} sx={{ minHeight: "25rem" }}>
        {mapSection()}
      </Grid>
    </Grid>
  );
}

export default Items;
