import React from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import FAQItem from "../util/FAQItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoadging } from "../../../store/dataSlice";

function RequestSection(props) {
  const navigate = useNavigate();
  const skeletonArray = [...new Array(10)].map((_, i) => i + 1);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const loading = useSelector((state) => state.data.Loading);
  return (
    <Stack>
      <Grid container className="ReqBoard-Grid py2 aic">
        <Grid item xs={10}></Grid>
        <Grid item xs={2}>
          {(isAdmin || props.tab !== 2) && (
            <Button
              variant="contained"
              className="fwb"
              sx={{ mx: 5 }}
              onClick={() => navigate("/posts/requests")}
            >
              {isAdmin ? "공지작성" : "문의하기"}
            </Button>
          )}
        </Grid>
      </Grid>
      {/* 1page = 10개 */}
      <Paper sx={{ height: "650px" }} elevation={0}>
        {!loading &&
          props.RenderData &&
          props.RenderData.map((item, index) => (
            <React.Fragment key={index}>
              {FAQItem(item.state, item.title, item.createdAt, item._id)}
            </React.Fragment>
          ))}
        {loading &&
          !props.RenderData &&
          (() => <Typography>아직 문의사항이 없습니다</Typography>)}
        {loading &&
          skeletonArray.map((i) => (
            <Paper key={i} className="bodyFAQ-Paper" elevation={0}>
              <Grid className="center" height="3.5rem" container key={i}>
                <Grid className="center" item xs={2}>
                  <Skeleton variant="circular" width="2rem" height="2rem" />
                </Grid>
                <Grid className="center" item xs={7}>
                  <Skeleton variant="rounded" width="90%" height="2rem" />
                </Grid>
                <Grid className="center" item xs={3}>
                  <Skeleton variant="rounded" width="50%" height="2rem" />
                </Grid>
              </Grid>
            </Paper>
          ))}
      </Paper>
    </Stack>
  );
}

export default RequestSection;
