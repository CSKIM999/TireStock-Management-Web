import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
const EmptyBoard = () => {
  return (
    <Grid item xs={12}>
      <Paper elevation={0} className="emptyItem-Paper">
        <Typography>선택하신 조건을 만족하는 제품이 없습니다</Typography>
      </Paper>
    </Grid>
  );
};

export default EmptyBoard;
