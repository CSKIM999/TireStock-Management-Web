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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCallbackPrompt } from "../../hooks/useCallbackPrompt";
import { pushThumbNail, revokeThumbNail } from "../../store/dataSlice";
import imageCompression from "browser-image-compression";
import BreadCrumb from "../modules/BreadCrumb";
import ProductOption from "./modules/ProductOption";
import Upload from "./modules/Upload";
const itemCheck = { requests: 1, tires: 1, wheels: 1 };
const PO_Mapping = {
  TIRE: ["width", "profile", "size", "condition", "brand"],
  WHEEL: ["size", "region", "design"],
};
// props.adjust 를 통해 수정인지 생성인지 확인
export const convertURLtoFile = async (url) => {
  if (typeof url !== "string") return;
  const response = await fetch(url);
  const data = await response.blob();
  const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
  const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
  const metadata = { type: `image/${ext}` };
  return new File([data], filename, metadata);
};

function PostPage({ adjust }) {
  const POST_OR_UPDATE = adjust;
  const path = useLocation().pathname;
  const userID = useSelector((state) => state.user.userID);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const { item, id } = useParams();
  const [title, setTitle] = React.useState("");
  const [contents, setContents] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [form, setForm] = React.useState(new FormData());
  const [initialState, setInitialState] = React.useState(null);
  const [modify, setModify] = React.useState(false);
  const [noticeOrFAQ, setNoticeOrFAQ] = React.useState(isAdmin ? true : false);
  const [PO_type, setPO_type] = React.useState("NEW");
  const [PO_props, setPO_props] = React.useState(new Array(5).fill(""));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let removed = [];
  useCallbackPrompt(modify);

  React.useEffect(() => {
    if (!itemCheck[item]) {
      alert("잘못된 주소입니다");
      navigate("/");
    }
    if (item === "wheels") setPO_props(new Array(3).fill(""));
    if (!POST_OR_UPDATE) return;
    async function setInitial() {
      // adjust === true 일 경우 => 수정하기 위한 data get해오기
      await Axios.get(`/api/${item}/${id}`).then((response) => {
        if (response.data.success) {
          const payload = response.data.payload;
          setForm(new FormData());
          setTitle(payload.title);
          setContents(payload.detail);
          setImages([...payload.image]);
          resetThumbnails(payload.image);
          if (item === "tires" || item === "wheels") {
            setPO_type(payload.type.toUpperCase());
            const keyword = item === "tires" ? "TIRE" : "WHEEL";
            let temporaryArr = PO_props;
            PO_Mapping[keyword].forEach((item, index) => {
              temporaryArr[index] = `${payload[item]}`;
            });
            setPO_props([...temporaryArr]);
          }
        }
      });
    }
    setInitial();
  }, []);

  React.useEffect(() => {
    if (POST_OR_UPDATE && initialState === null && title.length > 0)
      return setInitialState([title, contents, [...images]]);

    if (!POST_OR_UPDATE) return setInitialState([title, contents, [...images]]);
    if (!modify && initialState && initialState !== [title, contents, images])
      setModify(true);
  }, [title, contents, images]);

  function resetThumbnails(arr) {
    dispatch(revokeThumbNail());
    if (arr.length > 0) {
      const compressThumbnailOption = {
        maxSizeMB: 1,
        maxWidthOrHeight: 100,
      };
      arr.forEach(async (image, index) => {
        const data = await convertURLtoFile(image);
        const compressedImage = await imageCompression(
          data ?? image,
          compressThumbnailOption
        );
        const compressedURL = window.URL.createObjectURL(compressedImage);
        dispatch(
          pushThumbNail({ url: compressedURL, index: index, path: path })
        );
      });
    }
  }

  const setFormHandler = async (fieldName, value) => {
    setForm((prevForm) => {
      prevForm.append(`${fieldName}`, value);
      return prevForm;
    });
  };

  const appendAll = async (body) => {
    for (const [key, value] of Object.entries(body)) {
      setFormHandler(`${key}`, value);
    }
    if (images.length > 0) {
      setFormHandler("imageUpload", true);
      if (!POST_OR_UPDATE) {
        images.forEach((image) => {
          setFormHandler("image", image);
        });
      } else {
        images.forEach(async (image) => {
          if (initialState[2].includes(image)) {
            await setFormHandler("origin", image);
          } else {
            await setFormHandler("image", image);
          }
        });
        if (removed.length > 0) {
          removed.forEach((item) => {
            setFormHandler("removed", item);
          });
        }
      }
    }
  };

  const handleImages = (index) => {
    setImages((prev) => {
      let newArr = prev;
      let spliced = newArr.splice(index, 1);
      const initialImages = initialState[2];
      if (initialImages.includes(spliced[0])) {
        removed.push(spliced);
      }
      return newArr;
    });
    resetThumbnails(images);
  };

  const handleSubmit = async () => {
    const compressOption = {
      maxSizeMB: 1,
      maxWidthOrHeight: 150,
    };
    let body = {
      writer: userID,
      title: title,
      detail: contents,
    };

    if (!title.trim() || !contents.trim())
      return alert("문의 내용을 작성해주세요!");
    setModify(false);

    // 특수 data setting
    if (item === "requests") {
      if (isAdmin && noticeOrFAQ) body.state = "notice";
      if (isAdmin && !noticeOrFAQ) body.state = "FAQ";
    } else {
      body["type"] = PO_type.toLowerCase();
      if (item === "tires") {
        PO_props.forEach((item, index) => {
          if (PO_type === "NEW" && index === 3) body["condition"] = "100";
          else {
            const key = PO_Mapping["TIRE"][index];
            body[`${key}`] = item;
          }
        });
      } else if (item === "wheels") {
        PO_props.forEach((item, index) => {
          const key = PO_Mapping["WHEEL"][index];
          body[`${key}`] = item;
        });
      }
      if (images.length > 0) {
        const compressedFile = await imageCompression(
          images[0],
          compressOption
        );
        setForm((prevForm) => {
          prevForm.append("thumbnail", compressedFile);
          return prevForm;
        });
      }
    }
    console.log(body);

    if (!POST_OR_UPDATE) {
      await appendAll(body);
      Axios.post(`/api/${item}/`, form, {
        headers: {
          "Content-type": `multipart/form-data`,
        },
      }).then((response) => {
        if (response.data.success) {
          alert("문의가 정상적으로 등록되었습니다.");
          navigate(
            `/${item}/${item !== "requests" ? PO_type.toLowerCase() : ""}`
          );
        } else {
          alert("문의 등록에 실패했습니다");
        }
      });
    } else {
      await appendAll(body);
      Axios.put(`/api/${item}/${id}`, form, {
        headers: {
          "Content-type": `multipart/form-data`,
        },
      }).then((response) => {
        if (response.data.success) {
          alert("문의가 정상적으로 수정되었습니다.");
          navigate(
            `/${item}/${item !== "requests" ? PO_type.toLowerCase() : id}`
          );
        } else {
          alert("문의 등록에 실패했습니다");
          console.log(" F___A___I___L >> ", response);
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
        <Button size="large" onClick={() => handleSubmit()} variant="contained">
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
        height: `${isAdmin && item !== "requests" ? "90%" : "70%"}`,
        minHeight: "28rem",
        maxHeight: "60rem",
        flexWrap: "nowrap",
      }}
    >
      <Grid item xs={0.5}>
        {BreadCrumb("POSTING")}
      </Grid>

      {isAdmin && (item === "tires" || item === "wheels") && (
        <ProductOption
          PO_item={item}
          PO_type={[PO_type, setPO_type]}
          PO_props={[PO_props, setPO_props]}
        />
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
                    isAdmin &&
                    item === "requests" && (
                      <FormControlLabel
                        value={noticeOrFAQ}
                        sx={{ whiteSpace: "nowrap" }}
                        control={
                          <Checkbox
                            onChange={() => setNoticeOrFAQ(!noticeOrFAQ)}
                          />
                        }
                        label={`${noticeOrFAQ ? "공지" : "FAQ"}`}
                        labelPlacement="end"
                      />
                    )
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

        <Upload
          images={[images, setImages, handleImages]}
          POST_OR_UPDATE={POST_OR_UPDATE}
        />
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
