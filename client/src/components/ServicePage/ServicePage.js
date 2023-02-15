import { Box, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import * as React from "react";
import RequestUnit from "./util/RequestUnit";

function ServicePage() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value);
  };
  const indicatorProp = {
    sx: {
      bgcolor: "white",
      borderRadius: "0.5rem",
    },
  };
  return (
    <Box sx={{ py: 5, px: 10, height: "100%", width: "100%" }}>
      <Typography variant="h5">&gt; REPAIR & FAQ</Typography>
      <Tabs
        onChange={handleChange}
        sx={{ borderColor: "divider" }}
        visibleScrollbar
        value={value}
        scrollButtons={false}
        TabIndicatorProps={indicatorProp}
      >
        <Tab label="1 : 1 문의" />
        <Tab label="내 복원문의" />
        <Tab label="공지사" />
      </Tabs>
      <Grid container direction="column" sx={{ height: "100%", width: "100%" }}>
        <Grid item xs={1}>
          <Typography>HI</Typography>
        </Grid>
        <Grid item xs={10}>
          <RequestUnit />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ServicePage;
