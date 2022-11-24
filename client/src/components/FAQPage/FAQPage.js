import React from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import BreadCrumb from "../modules/BreadCrumb";
import FAQItem from "./util/FAQItem";
import RequsetSection from "./Section/RequestSection";
const TabLabels = ["ALPHA", "BETA", "GAMMA"];
function FAQPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container sx={{ px: 10, py: 5 }} height="100%" direction="column">
      {BreadCrumb("repair & faq")}
      <Grid item xs={1}>
        <Paper sx={{ justifyContent: "center", borderRadius: 10 }}>
          <Tabs
            value={value}
            variant="fullWidth"
            onChange={handleChange}
            sx={{ mx: 5 }}
          >
            {TabLabels.map((item, index) => (
              <Tab label={item} key={index} />
            ))}
          </Tabs>
        </Paper>
      </Grid>
      <Grid item xs={10}>
        <Paper sx={{ height: "100%" }}>
          <RequsetSection tab={value} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default FAQPage;
