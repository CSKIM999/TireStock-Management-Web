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

// props.adjust 를 통해 수정인지 생성인지 확인

function PostPage(props) {
  const [Title, setTitle] = React.useState("");
  const [Contents, setContents] = React.useState("");
  const [Images, setImages] = React.useState([]);
  const [Loading, setLoading] = React.useState(true);
  const [InitialState, setInitialState] = React.useState(null);
  const [Modify, setModify] = React.useState(false);
  const userID = useSelector((state) => state.user.userID);
  const POST_OR_UPDATE = props.adjust ? true : false;
  const { item, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = useSelector((state) => state.user.isAdmin);

  useCallbackPrompt(Modify);

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
    // setInitialState([Title, Contents, Images]);
  }, []);

  React.useEffect(() => {
    // 1. 생성 POU = false
    // 2. 수정
    if (POST_OR_UPDATE && InitialState === null && Title.length > 0)
      return setInitialState([Title, Contents, Images]);
    if (!POST_OR_UPDATE) return setInitialState([Title, Contents, Images]);
    if (
      !Modify &&
      InitialState !== [Title, Contents, Images] &&
      InitialState !== null
    ) {
      console.log("go false");
      setModify(true);
    }
  }, [Title, Contents, Images]);

  const submit = () => {
    if (!Title.trim() || !Contents.trim()) {
      return alert("문의 내용을 작성해주세요!");
    }
    setModify(false);
    const body = {
      writer: userID,
      title: Title,
      detail: Contents,
      image: Images,
    };
    if (!POST_OR_UPDATE) {
      Axios.post("/api/requests/", body).then((response) => {
        if (response.data.succes) {
          alert("문의가 정상적으로 등록되었습니다.");
          navigate("/requests");
        }
      });
    } else {
      const body = {
        title: Title,
        detail: Contents,
        image: Images,
      };
      Axios.put(`/api/requests/${id}`, body).then((response) => {
        if (response.data.success) {
          alert("문의가 정상적으로 수정되었습니다.");
          navigate(`/requests/${id}`);
        }
      });
    }
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

      {authUser && item === "admin" && <ProductOption />}

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
              console.log("POST OR UPDATE>", POST_OR_UPDATE);
            }}
            variant="outlined"
          >
            STATE TEST
          </Button>
          <Button
            size="large"
            onClick={() => console.log(InitialState)}
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
