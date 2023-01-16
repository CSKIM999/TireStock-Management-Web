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

function PostPage({ adjust }) {
  const POST_OR_UPDATE = adjust;
  const { item, id } = useParams();
  const [title, setTitle] = React.useState("");
  const [contents, setContents] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [initialState, setInitialState] = React.useState(null);
  const [modify, setModify] = React.useState(false);
  const userID = useSelector((state) => state.user.userID);
  const authUser = useSelector((state) => state.user.isAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useCallbackPrompt(modify);

  React.useEffect(() => {
    if (!itemCheck[item]) {
      alert("잘못된 주소입니다");
      navigate("/");
    }
    if (!POST_OR_UPDATE) return;
    // console.log(id, POST_OR_UPDATE);
    async function setInitial() {
      await Axios.get(`/api/${item}/${id}`).then((response) => {
        if (response.data.success) {
          const payload = response.data.payload;
          setTitle(payload.title);
          setContents(payload.detail);
          setImages([...payload.image]);
        }
      });
    }
    setInitial();
    // setInitialState([Title, Contents, Images]);
  }, []);

  React.useEffect(() => {
    // 1. 생성 POU = false
    // 2. 수정
    if (POST_OR_UPDATE && initialState === null && title.length > 0)
      return setInitialState([title, contents, images]);
    if (!POST_OR_UPDATE) return setInitialState([title, contents, images]);
    if (
      !modify &&
      initialState !== [title, contents, images] &&
      initialState !== null
    ) {
      console.log("go false");
      setModify(true);
    }
  }, [title, contents, images]);

  const handleSubmit = () => {
    if (!title.trim() || !contents.trim()) {
      return alert("문의 내용을 작성해주세요!");
    }
    setModify(false);
    const body = {
      writer: userID,
      title: title,
      detail: contents,
      image: images,
    };
    if (!POST_OR_UPDATE) {
      try {
        Axios.post("/api/requests/", body).then((response) => {
          if (response.data.succes) {
            alert("문의가 정상적으로 등록되었습니다.");
            navigate("/requests");
          } else {
            alert("문의 등록에 실패했습니다");
          }
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      const body = {
        title: title,
        detail: contents,
        image: images,
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
            <Grid item xs={mapTable.left.left} sx={mapTable.left.sx}>
              <Typography>Title</Typography>
            </Grid>
            <Grid item xs={mapTable.left.right}>
              <Paper elevation={5} sx={paperStyle}>
                <InputBase
                  placeholder="문의 제목을 작성해주세요"
                  sx={inputBaseStyle}
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid item container xs={9}>
            <Grid item xs={mapTable.left.left} sx={mapTable.left.sx}>
              <Typography>Contents</Typography>
            </Grid>
            <Grid item xs={mapTable.left.right}>
              <Paper elevation={5} sx={paperStyle}>
                <InputBase
                  placeholder="문의 내용을 작성해주세요"
                  multiline
                  sx={inputBaseStyle}
                  value={contents}
                  onChange={(event) => {
                    setContents(event.target.value);
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Divider orientation="vertical" sx={{ height: "100%" }} />

        <Upload images={[images, setImages]} />
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Grid item display="flex" justifyContent="center">
        <Stack direction="row" spacing={2}>
          <Button size="large" variant="outlined">
            CANCEL
          </Button>
          <Button
            size="large"
            onClick={() => handleSubmit()}
            variant="outlined"
          >
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
            onClick={() => console.log(initialState)}
            variant="outlined"
          >
            REVOKE TEST
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

const mapTable = {
  left: {
    sx: { display: "flex", justifyContent: "center", alignItems: "center" },
    left: 2,
    right: 10,
    bottom: "400px",
  },
};
const inputBaseStyle = {
  py: 1,
  px: 2,
  minHeight: "100%",
  flexDirection: "column",
  width: "100%",
};

const paperStyle = {
  width: "100%",
  height: "100%",
  overflow: "auto",
};

export default PostPage;
