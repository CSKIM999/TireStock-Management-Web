import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Dropzone from "react-dropzone";
import { CloudUploadOutlined } from "@mui/icons-material";

const Upload = () => {
  const [Images, setImages] = React.useState([]);
  const UploadHandler = async (files) => {
    if (files[0].size > 1000000)
      return alert("파일을 업로드 할 수 없습니다 크기를 확인해주세요!");
    if (files[0].type.split("/")[0] !== "image")
      return alert("이미지 파일만 업로드 해주세요!");
    if (Images.length >= 5)
      return alert("이미지는 최대 5장까지만 업로드할 수 있습니다.");
    let formData = new FormData();
    const config = {
      header: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("file", files[0]);
    console.log(formData, files);
    setImages([...Images, files[0]]);
    console.log(Images);
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
