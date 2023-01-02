import { BugReport, Check, CheckCircle, Help } from "@mui/icons-material";
import { Box, Card, CardActionArea, Grid, Typography } from "@mui/material";
import React from "react";

/**
 *
 * @param {string} state success / pending / fulfilled  / ""EMPTY
 * @returns ICON
 */
const iconSet = (state) => {
  switch (state) {
    case "success":
      return <CheckCircle color="success" />;
    case "fulfilled": //진행중
      return <Help color="primary" />;
    case "pending": //보류
      return <Help color="primary" />;
    default:
      return <BugReport color="error" />;
  }
};

/**
 * @param {string} state [success / pending / fulfilled / ""EMPTY]
 * @param {string} title
 * @param {date} date
 * @param {string} _id
 * @returns <CARD>
 */
function FAQItem(state, title, date, _id = undefined) {
  return (
    <Card>
      <CardActionArea href={_id ? `/requests/${_id}` : ""}>
        <Grid
          container
          className="ReqItem"
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
            <Typography>{date.split("T")[0].replaceAll("-", " / ")}</Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}

export default FAQItem;
