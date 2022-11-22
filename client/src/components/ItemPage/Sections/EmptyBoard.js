import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
const EmptyBoard = () => {
  return (
    <Grid item xs={12}>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "5rem",
        }}
      >
        <Typography>선택하신 조건을 만족하는 제품이 없습니다</Typography>
      </Paper>
    </Grid>
  );
};

export default EmptyBoard;
