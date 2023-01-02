import {
  Box,
  Divider,
  Grid,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import BreadCrumb from "../modules/BreadCrumb";

function RegistPage() {
  const [Title, setTitle] = React.useState("");
  const [Contents, setContents] = React.useState("");

  const MapTable = {
    left: {
      sx: { display: "flex", justifyContent: "center" },
      left: 2,
      right: 10,
    },
  };

  return (
    <Grid
      container
      direction="column"
      sx={{
        px: 10,
        pt: 5,
        height: "50%",
        minHeight: "600px",
        maxHeight: "800px",
      }}
    >
      <Grid item xs={0.5}>
        {BreadCrumb("REGIST")}
      </Grid>

      <Grid item xs={11} container direction="row">
        <Grid item xs={8} container direction="column">
          <Grid item container xs={1} alignItems="center">
            <Grid item xs={MapTable.left.left} sx={MapTable.left.sx}>
              <Typography>Title</Typography>
            </Grid>
            <Grid item xs={MapTable.left.right}>
              <Paper elevation={5} sx={{ width: "100%" }}>
                <InputBase
                  placeholder="문의 제목을 작성해주세요"
                  sx={{ py: 1, px: 2, width: "100%" }}
                  value={Title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid item container xs={10}>
            <Grid item xs={MapTable.left.left} sx={MapTable.left.sx}>
              <Typography>Contents</Typography>
            </Grid>
            <Grid item xs={MapTable.left.right}>
              <Paper
                elevation={5}
                sx={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "400px",
                  overflow: "auto",
                }}
              >
                <InputBase
                  placeholder="문의 제목을 작성해주세요"
                  multiline
                  sx={{
                    py: 1,
                    px: 2,
                    width: "100%",
                    minHeight: "100%",
                    flexDirection: "column",
                  }}
                  value={Contents}
                  onChange={(event) => {
                    setContents(event.target.value);
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Typography>dropzone</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RegistPage;
