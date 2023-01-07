import {
  Box,
  Button,
  Divider,
  Grid,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useCallbackPrompt } from "../../hooks/useCallbackPrompt";
import { testData } from "../../store/dataSlice";
import BreadCrumb from "../modules/BreadCrumb";
import Upload from "./modules/Upload";

function PostPage() {
  const [Title, setTitle] = React.useState("");
  const [Contents, setContents] = React.useState("");
  const [Images, setImages] = React.useState([]);
  const [ThumbNails, setThumbNails] = React.useState([]);
  const dispatch = useDispatch();
  // usePrompt("Detected");
  // const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(
  //   Title || Contents || Images.length > 0
  // );

  const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(
    Title || Contents || Images.length > 0
  );

  React.useEffect(() => {
    console.log("propmt", showPrompt);
  }, [showPrompt]);

  const submit = () => {
    if (!Title.trim() || !Contents.trim()) {
      return alert("문의 내용을 작성해주세요!");
    }
    console.log("TITLE >> ", Title);
    console.log("Contents >> ", Contents);
  };

  return (
    <Grid
      container
      direction="column"
      sx={{
        px: 10,
        pt: 5,
        height: "70%",
        minHeight: "450px",
        maxHeight: "800px",
        flexWrap: "nowrap",
      }}
    >
      <Grid item xs={0.5}>
        {BreadCrumb("REGIST")}
      </Grid>

      {/* ADMIN POSTING PAGE 에서 OPTIONAL MODULE 자리 */}

      <Grid
        item
        container
        xs={9}
        justifyContent="space-between"
        direction="row"
      >
        <Grid
          item
          container
          xs={8}
          direction="column"
          justifyContent="space-around"
          flexWrap="nowrap"
        >
          <Grid item container xs={1} alignItems="center">
            <Grid item xs={MapTable.left.left} sx={MapTable.left.sx}>
              <Typography>Title</Typography>
            </Grid>
            <Grid item xs={MapTable.left.right}>
              <Paper elevation={5} sx={Paper_SX}>
                <InputBase
                  placeholder="문의 제목을 작성해주세요"
                  sx={InputBase_SX}
                  value={Title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid item container xs={9}>
            <Grid item xs={MapTable.left.left} sx={MapTable.left.sx}>
              <Typography>Contents</Typography>
            </Grid>
            <Grid item xs={MapTable.left.right}>
              <Paper elevation={5} sx={Paper_SX}>
                <InputBase
                  placeholder="문의 내용을 작성해주세요"
                  multiline
                  sx={InputBase_SX}
                  value={Contents}
                  onChange={(event) => {
                    setContents(event.target.value);
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Divider orientation="vertical" sx={{ height: "100%" }} />

        <Upload images={[Images, setImages]} />
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Grid item display="flex" justifyContent="center">
        <Stack direction="row" spacing={2}>
          <Button size="large" variant="outlined">
            CANCEL
          </Button>
          <Button size="large" onClick={() => submit()} variant="outlined">
            REGIST
          </Button>
          <Button
            size="large"
            onClick={() => {
              dispatch(testData());
            }}
            variant="outlined"
          >
            STATE TEST
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

const MapTable = {
  left: {
    sx: { display: "flex", justifyContent: "center", alignItems: "center" },
    left: 2,
    right: 10,
    bottom: "400px",
  },
};
const InputBase_SX = {
  py: 1,
  px: 2,
  minHeight: "100%",
  flexDirection: "column",
  width: "100%",
};

const Paper_SX = {
  width: "100%",
  height: "100%",
  overflow: "auto",
};

export default PostPage;
