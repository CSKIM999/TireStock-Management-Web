import React from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Pagination,
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
  const [Page, setPage] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handlePage = (event, newValue) => {
    setPage(newValue);
  };

  // useEffect 에서 axios 통신으로 총 req 수 구해오고 현재 페이지에 맞는 데이터 가져오기

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
      <Grid item xs={9}>
        <Paper sx={{ height: "100%" }}>
          <RequsetSection tab={value} />
        </Paper>
      </Grid>
      <Grid item xs={1}>
        <Stack spacing={2} alignItems="center" sx={{ pt: 1 }}>
          <Pagination
            count={3}
            page={Page}
            shape="rounded"
            onChange={handlePage}
            color="primary"
            size="large"
          />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default FAQPage;
