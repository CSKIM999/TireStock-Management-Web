import { CheckCircle, Error, Help } from "@mui/icons-material";
import { Grid, Stack, Typography } from "@mui/material";
import React from "react";

function RequestUnit() {
  const props = {
    operate: "while",
    title: "REQUSET TITLE",
    date: "2011/11/11",
  };

  return (
    <Grid container>
      <Grid item sm={2}>
        {props.operate === "done" ? (
          <CheckCircle sx={{ color: "green" }} />
        ) : props.operate === "while" ? (
          <Error sx={{ color: "yellow" }} />
        ) : (
          <Help />
        )}
      </Grid>
      <Grid item sm={7}>
        <Typography>{props.title}</Typography>
      </Grid>
      <Grid item sm={3}>
        <Typography>{props.date}</Typography>
      </Grid>
    </Grid>
  );
}

export default RequestUnit;
