import React from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import * as Axios from "axios";
import { MapsUgc } from "@mui/icons-material";
import { useSelector } from "react-redux";

const ItemComment = (props) => {
  const userNickname = useSelector((state) => state.user.nickname);
  React.useEffect(() => {}, []);

  const commentRender = (prop) => (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxHeight: 250,
        overflow: "auto",
      }}
    >
      {prop.length > 0 &&
        prop.map((item, index) => (
          <Grid item container key={index} sx={{ py: 0.5 }}>
            <Grid item xs={2}>
              <Typography sx={{ pr: 2 }}>{item.writer}</Typography>
            </Grid>
            <Grid item>
              <Typography>{item.comment}</Typography>
            </Grid>
            {/* BUTTONBOX */}
            <Grid item></Grid>
          </Grid>
        ))}
      {prop.length === 0 && <Typography></Typography>}
    </Paper>
  );
  const commentInput = () => {
    if (userNickname.length === 0) return alert("로그인이 필요합니다");
    console.log("COMMENT INPUT SUCCESS");
  };

  const InputRender = (
    <Paper
      elevation={2}
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <InputBase
        placeholder="원하시는 문의 댓글을 작성해주세요"
        sx={{ width: "80%", p: 1 }}
      />
      <Button
        variant="contained"
        endIcon={<MapsUgc />}
        color="primary"
        onClick={commentInput}
      >
        ENTER
      </Button>
    </Paper>
  );
  console.log(props);
  return (
    <Grid
      item
      xs={6}
      container
      spacing={2}
      flexWrap="nowrap"
      direction="column"
    >
      <Grid item xs={1}>
        <Typography
          variant="h5"
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          Comment
        </Typography>
      </Grid>
      <Grid item container xs={10} display="flex" direction="row">
        {commentRender(props)}
      </Grid>
      <Grid item xs={1} sx={{ height: "100%" }}>
        {InputRender}
      </Grid>
    </Grid>
  );
};

export default ItemComment;
