import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Dropzone from "react-dropzone";
import { CloudUploadOutlined } from "@mui/icons-material";

const Upload = (State) => {
  const [Images, setImages] = State;
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

    let formData = new FormData();
    const config = {
      header: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("file", files[0]);
    setImages([...Images, files[0]]);
  };
  return (
    <Grid item container direction="column" xs={3}>
      <Stack spacing={2} sx={{ height: "100%" }}>
        <Stack spacing={1} direction="row" alignItems="flex-end">
          <Typography>사진 첨부</Typography>
          <Typography variant="caption">최대 5장</Typography>
        </Stack>
        <Paper
          square
          sx={{
            width: "100%",
            aspectRatio: "1",
            border: "1px solid",
            borderColor: "primary.main",
            // bgColor: "primary.main",
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
            aspectRatio: "5",
            bgcolor: "primary.main",
          }}
        ></Paper>
      </Stack>
    </Grid>
  );
};

export default Upload;
