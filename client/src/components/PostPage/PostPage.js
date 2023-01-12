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
import * as Axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useCallbackPrompt } from "../../hooks/useCallbackPrompt";
import { revokeThumbNail, testData } from "../../store/dataSlice";
import BreadCrumb from "../modules/BreadCrumb";
import ProductOption from "./modules/ProductOption";
import Upload from "./modules/Upload";
const itemCheck = { requests: 1, admin: 1 };

function PostPage(props) {
  const [Title, setTitle] = React.useState("");
  const [Contents, setContents] = React.useState("");
  const [Images, setImages] = React.useState([]);
  const [Loading, setLoading] = React.useState(true);
  const userID = useSelector((state) => state.user.userID);
  const POST_OR_UPDATE = props.adjust ? true : false;
  const { item, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = useSelector((state) => state.user.isAdmin);

  const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(
    Title || Contents || Images.length > 0
  );

  React.useEffect(() => {
    if (!itemCheck[item]) {
      alert("잘못된 주소입니다");
      navigate("/");
    }
    if (!POST_OR_UPDATE) return;
    // console.log(id, POST_OR_UPDATE);
    async function SetInitial() {
      await Axios.get(`/api/${item}/${id}`).then((response) => {
        if (response.data.success) {
          const payload = response.data.payload;
          setTitle(payload.title);
          setContents(payload.detail);
          setImages([...payload.image]);
        }
      });
    }
    SetInitial();
  }, []);

  const submit = () => {
    if (!Title.trim() || !Contents.trim()) {
      return alert("문의 내용을 작성해주세요!");
    }
    console.log("TITLE >> ", Title);
    console.log("Contents >> ", Contents);
    console.log("Images >> ", Images);
    const body = {
      writer: userID,
      title: Title,
      detail: Contents,
      image: Images,
    };
    Axios.post("/api/requests/", body).then((response) => {
      console.log(response);
    });
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
        maxHeight: "1000px",
        flexWrap: "nowrap",
      }}
    >
      <Grid item xs={0.5}>
        {BreadCrumb("POSTING")}
      </Grid>

      {authUser && item === "admin" ? (
        <ProductOption />
      ) : (
        <React.Fragment></React.Fragment>
      )}

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
              console.log("userID>", userID);
            }}
            variant="outlined"
          >
            STATE TEST
          </Button>
          <Button
            size="large"
            onClick={() => {
              dispatch(revokeThumbNail());
            }}
            variant="outlined"
          >
            REVOKE TEST
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
