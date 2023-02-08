import {
  Button,
  Collapse,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
const PaperSX = {
  width: "100%",
  height: "100%",
};
const regex = /^[0-9\b]+$/;
function CoverRight({ props, coverPosition }) {
  const [searchToggle, setSearchToggle] = props;
  const navigate = useNavigate();
  const [width, setWidth] = React.useState("");
  const [profile, setProfile] = React.useState("");
  const [size, setSize] = React.useState("");
  const regexTest = (target) => {
    const value = target.value;
    if (regex.test(value) || value === "") {
      switch (target.id) {
        case "width":
          setWidth(value);
          break;
        case "profile":
          setProfile(value);
          break;
        default:
          setSize(value);
          break;
      }
    }
  };
  const searchHandler = (type) => {
    console.log(width, profile, size);
    let url = `/${searchToggle}/${type}/?`;
    if (searchToggle === "wheels") {
      if (!size) return alert("검색값을 입력해주세요!");
    } else {
      if (!width && !profile && !size) return alert("검색값을 입력해주세요");
      url += !width ? "" : `&width=${width}`;
      url += !profile ? "" : `&profile=${profile}`;
    }
    url += !size ? "" : `&size=${size}`;

    navigate(url);
  };
  return (
    <Grid
      item
      xs={coverPosition[1]}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Paper
        className="coverSearch"
        sx={{ ...PaperSX, maxWidth: "350px", borderRadius: "15px" }}
      >
        <Stack sx={{ alignItems: "center", p: 3 }} spacing={2}>
          <Typography fontWeight="bold">SEARCH ! WHAT YOU WANT ?</Typography>
          <Stack direction="row" spacing={3}>
            <Button
              variant={`${searchToggle === "tires" ? "contained" : "outlined"}`}
              onClick={() => {
                setSearchToggle("tires");
              }}
            >
              TIRE SEARCH
            </Button>
            <Button
              variant={`${
                searchToggle === "wheels" ? "contained" : "outlined"
              }`}
              onClick={() => {
                setSearchToggle("wheels");
              }}
            >
              WHEEL SEARCH
            </Button>
          </Stack>
          <Collapse
            in={searchToggle === "tires"}
            timeout={300}
            sx={{ width: "100%" }}
          >
            <Grid container>
              <Grid
                item
                xs={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography>Width</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  placeholder="265"
                  variant="outlined"
                  size="small"
                  id="width"
                  value={width}
                  onChange={(e) => regexTest(e.currentTarget)}
                />
              </Grid>
            </Grid>
            <Grid container sx={{ pt: 2 }}>
              <Grid
                item
                xs={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography>Profile</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  placeholder="55"
                  variant="outlined"
                  size="small"
                  id="profile"
                  value={profile}
                  onChange={(e) => regexTest(e.currentTarget)}
                />
              </Grid>
            </Grid>
          </Collapse>
          <Grid container>
            <Grid
              item
              xs={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Typography id="searchSize">Size</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                placeholder="19"
                variant="outlined"
                size="small"
                value={size}
                onChange={(e) => regexTest(e.currentTarget)}
              />
            </Grid>
          </Grid>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={() => searchHandler("used")}>
              USED - SEARCH
            </Button>
            <Button variant="contained" onClick={() => searchHandler("new")}>
              NEW - SEARCH
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  );
}

export default CoverRight;
