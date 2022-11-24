import React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
const tagDetail = {
  tires: ["Width - Profile - Size", "Brand", "Condition"],
  wheels: ["Size", "Region", "Design"],
};
const test = { variant: "h1" };

const spacingTop = 6;
const DetailDescribe = (props) => {
  // Deatil-Item => wheel 이라면 region, design, size 가 들어오고 tire 라면 size-3, brand, condition 이 들어옴
  // Detail-Req => ????
  const prop = props.prop;
  const type = props.type;
  let renderData = [];
  // switch by type
  if (type === "tires") {
    renderData = renderData.concat([
      `${prop.width} - ${prop.profile} - ${prop.condition}`,
      prop.brand,
      `++${prop.condition}%`,
    ]);
  }
  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "secondary.main",
      }}
    >
      <Stack sx={{ height: "100%" }}>
        <Grid container direction={"column"} sx={{ height: "100%", p: 4 }}>
          {/* Section Header */}
          <Grid item container direction={"row"} alignItems="flex-end">
            <Grid item xs={4}>
              <Typography
                variant="h5"
                sx={{ color: "primary.main", fontWeight: "bold" }}
              >
                Product Info
              </Typography>
            </Grid>
            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
              제품정보
            </Typography>
          </Grid>

          {/* SECTION - info */}
          <Grid item xs="auto" container alignItems="center" direction={"row"}>
            {/* INFO - TAG */}
            <Grid item xs={4}>
              <Stack spacing={spacingTop}>
                {tagDetail[type].map((item, index) => (
                  <Typography key={index}>{item}</Typography>
                ))}
              </Stack>
            </Grid>

            {/* INFO - detail */}
            <Grid item xs={"auto"}>
              <Stack spacing={spacingTop}>
                {tagDetail[type].map((item, index) => (
                  <Typography key={index}>{renderData[index]}</Typography>
                ))}
              </Stack>
            </Grid>
          </Grid>

          <Divider />

          {/* SECTION -  detail */}
          <Grid item xs={"auto"} container direction="column" sx={{ pt: 2 }}>
            <Grid item xs={1} container direction={"row"} alignItems="flex-end">
              <Grid item>
                <Typography
                  variant="h5"
                  sx={{ color: "primary.main", fontWeight: "bold" }}
                >
                  Detail
                </Typography>
              </Grid>
              <Typography variant="caption" sx={{ fontWeight: "bold", px: 3 }}>
                제품 상세
              </Typography>
            </Grid>

            {/* DETAIL - description */}
            {/* TODO : 받아온 정보 나열 */}
            <Grid item xs={"auto"} container direction="column" sx={{ py: 2 }}>
              <Typography>DESCRIPTION</Typography>
              <Typography>DESCRIPTION</Typography>
              <Typography>DESCRIPTION</Typography>
              <Typography>DESCRIPTION</Typography>
              <Typography>DESCRIPTION</Typography>
              <Typography>DESCRIPTION</Typography>
              <Typography>DESCRIPTION</Typography>
            </Grid>
            {/* DETAIL - RequsetZone */}
            <Grid item xs={"auto"}>
              <Stack direction="row" alignItems="center">
                <Button>HELLO</Button>
                <Typography>012-345-6789</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
};

export default DetailDescribe;
