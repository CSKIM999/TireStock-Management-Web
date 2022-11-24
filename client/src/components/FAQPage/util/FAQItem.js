import { BugReport, Check, CheckCircle, Help } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const iconSet = (state) => {
  switch (state) {
    case "success":
      return <CheckCircle color="success" />;
    case "pending":
      return <Help color="primary" />;
    default:
      return <BugReport color="error" />;
  }
};

function FAQItem(state, title, date, _id = undefined) {
  return (
    <Grid
      container
      className="ReqItem"
      _id={_id ? _id : ""}
      // hred=`/request/${_id}`
      sx={{
        py: 2,
        borderBottom: "1px solid white",
      }}
    >
      <Grid item xs={2}>
        {iconSet(`${state}`)}
      </Grid>
      <Grid item xs={7}>
        <Typography>{title}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>{date}</Typography>
      </Grid>
    </Grid>
  );
}

export default FAQItem;
