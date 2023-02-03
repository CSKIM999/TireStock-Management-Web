import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
const PaperSX = {
  width: "100%",
  height: "100%",
};
const coverPosition = [7, 5];
function Cover({ position }) {
  const [searchToggle, setSearchToggle] = React.useState("tires");
  return (
    <Grid item container xs={position}>
      <Grid item container justifyContent="center" alignItems="center">
        <Grid item xs={coverPosition[0]}>
          <Paper sx={PaperSX}>
            <Stack>
              <Typography>BUTTON</Typography>
            </Stack>
          </Paper>
        </Grid>
        <Grid
          item
          xs={coverPosition[1]}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Paper
            className="coverSearch"
            sx={{ ...PaperSX, maxWidth: "350px", borderRadius: "15px" }}
          >
            <Stack sx={{ alignItems: "center" }} spacing={2}>
              <Typography fontWeight="bold">
                SEARCH ! WHAT YOU WANT ?
              </Typography>
              <Stack direction="row" spacing={3}>
                <Button
                  variant={`${
                    searchToggle === "tires" ? "contained" : "outlined"
                  }`}
                  onClick={() => setSearchToggle("tires")}
                >
                  TIRE SEARCH
                </Button>
                <Button
                  variant={`${
                    searchToggle === "wheels" ? "contained" : "outlined"
                  }`}
                  onClick={() => setSearchToggle("wheels")}
                >
                  WHEEL SEARCH
                </Button>
              </Stack>
              <Grid container>
                <Grid item xs={4}>
                  <Typography>ITEM</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField variant="outlined" />
                </Grid>
              </Grid>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default Cover;
