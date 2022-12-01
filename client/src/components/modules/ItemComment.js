import React from "react";
import { Box, Grid, Typography } from "@mui/material";
const ItemComment = () => {
  return (
    <Grid item xs={5} container flexWrap="nowrap" direction="column">
      <Grid item xs={1}>
        <Typography
          variant="h5"
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          Comment
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ItemComment;
