import React from "react";
import * as Axios from "axios";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
const itemBoxSX = "1px solid black";
const itemPaperSX = {
  width: "100%",
  height: "100%",
  bgcolor: "secondary.main",
};
function DetailPage(props) {
  // const prop = props.prop;
  const prop = {
    request: "item",
    item: "tire",
    type: "new",
    title: "금호 마제스티 솔루스",
  };
  if (prop.request && prop.request === "item") {
    // id 가지고 정보 받아오기
  }
  return (
    <Box sx={{ px: 10, pt: 5, height: "100%" }}>
      <Grid container direction="column" height="100%">
        <Grid item xs={1}>
          <Stack spacing={2}>
            <Typography>
              {prop.item.toUpperCase()} &gt; {prop.type.toUpperCase()}
            </Typography>
            <Typography>{prop.title}</Typography>
          </Stack>
        </Grid>
        <Divider />
        <Grid
          item
          xs={8}
          container
          direction="row"
          sx={{ py: 3, borderTop: itemBoxSX, borderBottom: itemBoxSX }}
        >
          <Grid item xs={12} md={5.5} sx={{ pr: 2 }}>
            <Paper sx={itemPaperSX}></Paper>
          </Grid>
          <Grid item xs={12} md={6.5}>
            <Paper sx={itemPaperSX}>
              <Stack>
                <Typography>HI</Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DetailPage;
