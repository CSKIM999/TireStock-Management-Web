import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
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
  const userID = useSelector((state) => state.user.userID);
  const admin = useSelector((state) => state.user.isAdmin);
  const { item, id } = useParams();
  const [title, setTitle] = React.useState("");
  const [contents, setContents] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [initialState, setInitialState] = React.useState(null);
  const [modify, setModify] = React.useState(false);
  const [notice, setNotice] = React.useState(admin ? false : true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useCallbackPrompt(modify);

  React.useEffect(() => {
    if (!itemCheck[item]) {
      alert("잘못된 주소입니다");
      navigate("/");
    }
    if (!POST_OR_UPDATE) return;
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
  }, []);

  React.useEffect(() => {
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
    if (notice) body.state = "notice";
    if (!POST_OR_UPDATE) {
      try {
        Axios.post("/api/requests/", body).then((response) => {
          console.log(
            "🚀 ~ file: PostPage.js:96 ~ Axios.post ~ response",
            response
          );
          if (response.data.success) {
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
      if (notice) body.state = "notice";
      Axios.put(`/api/requests/${id}`, body).then((response) => {
        if (response.data.success) {
          alert("문의가 정상적으로 수정되었습니다.");
          navigate(`/requests/${id}`);
        }
      });
    }
  };

  const ButtonSet = (
    <Grid item display="flex" justifyContent="center">
      <Stack direction="row" spacing={2}>
        <Button size="large" variant="outlined">
          CANCEL
        </Button>
        <Button size="large" onClick={() => handleSubmit()} variant="outlined">
          REGIST
        </Button>
      </Stack>
    </Grid>
  );

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

      {admin && item === "admin" && <ProductOption />}

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
                  sx={{
                    flexDirection: "row",
                    ...inputBaseStyle,
                  }}
                  value={title}
                  endAdornment={
                    <FormControlLabel
                      value={notice}
                      sx={{ whiteSpace: "nowrap" }}
                      control={<Checkbox onChange={() => setNotice(!notice)} />}
                      label="공지여부"
                      labelPlacement="end"
                    />
                  }
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
                  sx={{
                    flexDirection: "column",
                    ...inputBaseStyle,
                  }}
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
      {ButtonSet}
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
  width: "100%",
};

const paperStyle = {
  width: "100%",
  height: "100%",
  overflow: "auto",
};

export default PostPage;
