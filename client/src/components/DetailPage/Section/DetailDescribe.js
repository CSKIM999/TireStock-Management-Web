import React from "react";
import {
  Box,
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
        <Grid container direction={"column"} sx={{ height: "100%" }}>
          {/* Section Header */}
          <Grid container direction={"row"} alignItems="flex-end" sx={{ p: 2 }}>
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
          <Grid
            item
            xs="auto"
            container
            alignItems="center"
            direction={"row"}
            sx={{ px: 2 }}
          >
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
          <Grid item xs={"auto"} container direction={"row"} sx={{ p: 2 }}>
            {/* DETAIL - TAG */}
            <Stack>
              <Typography>HI</Typography>
              <Typography>HI</Typography>
            </Stack>

            {/* DETAIL - detail */}
            <Grid item xs={"auto"} container direction="column">
              <Typography>HI</Typography>
              <Typography>HI</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
};

export default DetailDescribe;
