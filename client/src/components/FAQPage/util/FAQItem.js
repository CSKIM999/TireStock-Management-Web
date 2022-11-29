import { BugReport, Check, CheckCircle, Help } from "@mui/icons-material";
import { Box, Card, CardActionArea, Grid, Typography } from "@mui/material";
import React from "react";

/**
 *
 * @param {string} state success / pending / ""EMPTY
 * @returns ICON
 */
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

/**
 *
 * @param {string} state [success / pending / ""EMPTY]
 * @param {string} title
 * @param {date} date
 * @param {string} _id
 * @returns <CARD>
 */
function FAQItem(state, title, date, _id = undefined) {
  return (
    <Card>
      <CardActionArea>
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
      </CardActionArea>
    </Card>
  );
}

export default FAQItem;
