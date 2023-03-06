import {
  BugReport,
  Cancel,
  CheckCircle,
  Help,
  Info,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

/**
 *
 * @param {string} state success / pending / fulfilled  / ""EMPTY
 * @returns ICON
 */
const iconSet = (state) => {
  switch (state) {
    case "pending":
      return <CheckCircle color="success" />;
    case "fulfilled": //진행중
      return <Help color="primary" />;
    case "rejected": //보류
      return <Cancel color="error" />;
    case "notice":
      return <Info color="info" />;
    case "FAQ":
      return <Info color="info" />;
    default:
      return <BugReport color="error" />;
  }
};

/**
 * @param {string} state [ pending / fulfilled / rejuected / notice / FAQ]
 * @param {string} title
 * @param {date} date
 * @param {string} _id
 * @returns <CARD>
 */
function FAQItem(state, title, date, _id = undefined) {
  return (
    <Card elevation={0} className="bodyFAQ-Paper">
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
