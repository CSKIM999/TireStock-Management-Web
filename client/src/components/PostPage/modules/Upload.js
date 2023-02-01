import React from "react";
import {
  Badge,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import Dropzone from "react-dropzone";
import { Clear, CloudUploadOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import imageCompression from "browser-image-compression";
import { useLocation } from "react-router-dom";
import { pushThumbNail, revokeThumbNail } from "../../../store/dataSlice";

const Upload = (props) => {
  // 글을 쓰는건 전부 post 로 통일하자!
  const path = useLocation().pathname;
  const [Images, setImages, handleImages] = props.images;
  const dispatch = useDispatch();

  const compressOption = {
    maxSizeMB: 1,
    maxWidthOrHeight: 100,
  };

  React.useEffect(() => {
    dispatch(revokeThumbNail());
    Images.forEach(async (image, index) => {
      console.log("🚀 ~ file: Upload.js:38 ~ Images.forEach ~ image", image);

      const compressedImage = await imageCompression(image, compressOption);
      const compressedURL = window.URL.createObjectURL(compressedImage);
      console.log(
        "🚀 ~ file: Upload.js:37 ~ Images.forEach ~ compressedURL",
        compressedURL
      );
      dispatch(
        pushThumbNail({
          url: compressedURL,
          index: index + compressedURL,
          path: path,
        })
      );
    });
  }, []);

  const mappingArr = [0, 1, 2, 3, 4];
  const Thumbnails = useSelector((state) => state.data.thumbNail.items);
  const UploadHandler = async (files) => {
    if (files[0].size > 1000000)
      return alert("파일을 업로드 할 수 없습니다 크기를 확인해주세요!");
    if (files[0].type.split("/")[0] !== "image")
      return alert("이미지 파일만 업로드 해주세요!");
    if (Images.length >= 5)
      return alert("이미지는 최대 5장까지만 업로드할 수 있습니다.");

    // 임시 Image_URL 을 만들어서 미리보기 파일을 렌더하자!
    // upload 임시파일이 유효하다면 URL 생성.
    // >> 이 URL은 세션저장소에 저장되는듯 함. 따라서 사용 후 revoke 시켜주어야 메모리 누수 방지가 가능함.
    // 삭제 버튼 누르면 revoke
    // upload Axios ( 문의 등록 ) 가 호출되면 성공여부에 따라 revoke 해주기
    // >> 만약 문의 등록을 안하고 취소해버리거나 뒤로 이동해버리면???
    //  >> 페이지 이동을 감지해서 어떻게든 revoke 해주고싶음.
    //  >> 찾아보니 V5 에 있었던 이동 감지모듈 Prompt 가 V6 에서 불안정성을 이유로 없어졌다고 함. 대안을 찾아보자
    // Prompt 를 띄우는데에는 성공했는데, 이동 전/후에 원하는 함수를 실행시키는 방법은 찾지를 못함.
    // 더 찾아보지 말고 redux 사용하는 방법 고민.
    // 이미지 URL 을 redux에서 관리하고, 페이지 이동시에만 호출되는 auth 에서 해당 리스트가 비어있는지를 확인하는 방법.

    // let formData = new FormData();
    // const config = {
    //   header: {
    //     "content-type": "multipart/form-data",
    //   },
    // };
    // formData.append("file", files[0]);

    // formHandler(files[0]);

    const compressedFile = await imageCompression(files[0], compressOption);
    const compressedURL = window.URL.createObjectURL(compressedFile);
    setImages([...Images, files[0]]);
    dispatch(
      pushThumbNail({ url: compressedURL, index: Images.length, path: path })
    );
  };
  return (
    <Grid item container direction="column" xs={3}>
      <Stack spacing={4} sx={{ height: "100%" }}>
        <Stack spacing={1} direction="row" alignItems="flex-end">
          <Typography>사진 첨부</Typography>
          <Typography variant="caption">최대 5장</Typography>
        </Stack>
        <Paper
          square
          sx={{
            width: "100%",
            aspectRatio: "1/1",
            border: "1px solid",
            borderColor: "primary.main",
          }}
        >
          <Dropzone onDrop={UploadHandler}>
            {({ getRootProps, getInputProps }) => (
              <Box
                display="flex"
                sx={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <CloudUploadOutlined sx={{ fontSize: "4em" }} />
              </Box>
            )}
          </Dropzone>
        </Paper>
        <Paper
          square
          sx={{
            width: "100%",
            minHeight: "50px",
            aspectRatio: "5",
          }}
        >
          <Stack
            direction="row"
            sx={{ height: "100%", justifyContent: "space-around" }}
          >
            {Thumbnails[0] &&
              mappingArr.map((item) => (
                <Badge
                  className="thumbNail"
                  badgeContent={
                    <Clear
                      fontSize="small"
                      onClick={(e) => handleImages(Thumbnails[item][1])}
                    />
                  }
                  color="primary"
                  key={`thumbNail${item}`}
                  invisible={Thumbnails[item] ? false : true}
                  sx={{ borderBottomLeftRadius: "0px" }}
                >
                  <Container
                    sx={{
                      p: 0,
                      height: "100%",
                      backgroundImage: Thumbnails[item]
                        ? `url(${Thumbnails[item][0]})`
                        : "",
                      backgroundSize: "cover",
                    }}
                  />
                </Badge>
              ))}
          </Stack>
        </Paper>
      </Stack>
    </Grid>
  );
};

export default React.memo(Upload);
