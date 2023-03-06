import React from "react";
import * as Axios from "axios";
import {
  Box,
  Button,
  Divider,
  Grid,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import BreadCrumb from "../modules/BreadCrumb";
import FAQItem from "./util/FAQItem";
import RequestSection from "./Section/RequestSection";
import { useDispatch, useSelector } from "react-redux";
import { setLoadging } from "../../store/dataSlice";
const TabLabels = ["문의사항", "내 문의", "FAQ"];
function FAQPage() {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [documentsCount, setDocumentsCount] = React.useState([
    undefined,
    undefined,
    undefined,
  ]);
  const [renderData, setRenderData] = React.useState([]);
  const [renderView, setRenderView] = React.useState(true);
  const dispatch = useDispatch();
  const dispatchLoading = (bool) => {
    dispatch(setLoadging(bool));
  };
  const userID = useSelector((state) => state.user.userID);
  const handleChange = (event, newValue) => {
    setPage(1);
    setTabIndex(newValue);
  };
  const handlePage = (event, newValue) => {
    setPage(newValue);
  };
  async function AxiosWithURL(optionURL) {
    let flag = false;
    setTimeout(() => {
      if (flag) dispatchLoading(false);
      flag = true;
    }, 300);
    if (optionURL !== null) {
      await Axios.get("/api/requests" + optionURL).then((response) => {
        if (response) {
          if (!documentsCount[tabIndex] && response.data.totalDocuments) {
            let docCount = [...documentsCount];
            docCount[tabIndex] = Math.ceil(response.data.totalDocuments / 10);
            setDocumentsCount([...docCount]);
          }
          setRenderData(response.data.payload);
        } else {
          console.log("axios error in FAQPAGE");
        }
      });
    }
    if (flag) dispatchLoading(false);
    flag = true;

    if (!userID) {
      if (renderView && tabIndex === 1) return setRenderView(false);
      return setRenderView(true);
    }
  }
  React.useEffect(() => {
    dispatchLoading(true);
    let optionURL = null;
    if (tabIndex === 1) {
      if (userID) {
        optionURL = documentsCount[tabIndex]
          ? `/?page=${page}&userID=${userID}`
          : `/?userID=${userID}`;
      } else {
        optionURL = null;
      }
    } else if (tabIndex === 2) {
      optionURL = documentsCount[tabIndex]
        ? `/?page=${page}&state="FAQ"`
        : `/?state=FAQ`;
    } else {
      optionURL = documentsCount[tabIndex] ? `/?page=${page}` : "";
    }
    AxiosWithURL(optionURL);
  }, [page, tabIndex]);
  // React.useEffect(() => {
  //   console.log("hi value");
  // }, [value]);

  // useEffect 에서 axios 통신으로 총 req 수 구해오고 현재 페이지에 맞는 데이터 가져오기

  return (
    <Grid container sx={{ px: 10, py: 5 }} height="100%" direction="column">
      {BreadCrumb("request & faq", "", "문의사항 & 자주묻는 질문")}
      <Grid item xs={1}>
        <Paper className="navFAQ-Paper">
          <Tabs
            value={tabIndex}
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
        <Paper className="bodyFAQ-Paper">
          {renderView ? (
            <RequestSection RenderData={renderData} tab={tabIndex} />
          ) : (
            <Box
              className="center"
              sx={{
                height: "200px",
              }}
            >
              <Typography variant="h5">로그인이 필요합니다</Typography>
            </Box>
          )}
        </Paper>
      </Grid>
      <Grid item xs={1}>
        <Stack spacing={2} alignItems="center" sx={{ pt: 2 }}>
          <Pagination
            count={documentsCount[tabIndex]}
            page={page}
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
