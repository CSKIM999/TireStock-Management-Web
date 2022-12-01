import React from "react";
import * as Axios from "axios";
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
import RequestSection from "./Section/RequestSection";
const TabLabels = ["ALPHA", "BETA", "GAMMA"];
function FAQPage() {
  const [value, setValue] = React.useState(0);
  const [Page, setPage] = React.useState(1);
  const [DocumentsCount, setDocumentsCount] = React.useState(undefined);
  const [RenderData, setRenderData] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handlePage = (event, newValue) => {
    setPage(newValue);
  };
  React.useEffect(() => {
    const optionURL = DocumentsCount ? `/?page=${Page}` : "";
    Axios.get("/api/requests" + optionURL).then((response) => {
      if (response) {
        console.log(response);
        if (!DocumentsCount && response.data.totalDocuments) {
          setDocumentsCount(parseInt(response.data.totalDocuments / 10) + 1);
        }
        setRenderData(response.data.payload);
      } else {
        console.log("axios error in FAQPAGE");
      }
    });
  }, [Page]);
  // React.useEffect(() => {
  //   console.log("hi value");
  // }, [value]);

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
      <Grid item xs="auto">
        <Paper sx={{ maxHeight: 650 }}>
          <RequestSection RenderData={RenderData} tab={value} />
        </Paper>
      </Grid>
      <Grid item xs={1}>
        <Stack spacing={2} alignItems="center" sx={{ pt: 2 }}>
          <Pagination
            count={DocumentsCount}
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
