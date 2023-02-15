import React from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  InputBase,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import * as Axios from "axios";
import { HighlightOff, MapsUgc } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ItemComment = (props, captureComment) => {
  const user = useSelector((state) => state.user);
  const RequestId = useParams().id;
  const [Comment, setComment] = React.useState("");

  const commentHandler = () => {
    if (user.userID.length === 0) return alert("로그인이 필요합니다");
    if (Comment.trim().length === 0) return alert("댓글 내용을 작성해주세요");
    Axios.post(`/api/requests/${RequestId}/comment`, {
      writer: user.nickname,
      w_id: user.userID,
      comment: Comment.trim(),
    }).then((response) => {
      captureComment();
      setComment("");
      console.log(response);
    });
  };

  const onDelete = (_id) => {
    Axios.delete(`/api/requests/${RequestId}/${_id}`).then(() => {
      captureComment();
    });
  };

  const InputRender = (
    <Paper
      elevation={0}
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "inherit",
      }}
    >
      <OutlinedInput
        className="comment"
        placeholder="원하시는 문의 댓글을 작성해주세요"
        sx={{ width: "80%" }}
        value={Comment}
        onChange={(event) => {
          setComment(event.target.value);
        }}
      />
      <Button
        variant="contained"
        endIcon={<MapsUgc />}
        color="primary"
        onClick={commentHandler}
      >
        ENTER
      </Button>
    </Paper>
  );

  const commentRender = (prop) => (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxHeight: 250,
        overflow: "auto",
        bgcolor: "inherit",
      }}
    >
      {prop.length > 0 &&
        prop.map((item, index) => (
          <Grid
            item
            container
            key={index}
            sx={{ py: 0.5, alignItems: "center" }}
          >
            <Grid item xs={2}>
              <Typography className="fwb" sx={{ pr: 2 }}>
                {item.writer}
              </Typography>
            </Grid>
            <Grid item xs={9.5}>
              <Typography className="full Plevel1" sx={{ py: 1, pl: 1 }}>
                {item.comment}
              </Typography>
            </Grid>
            {/* BUTTONBOX */}
            {item.w_id === user.userID && (
              <Grid item xs={1}>
                <IconButton onClick={() => onDelete(item._id)} sx={{ p: 0 }}>
                  <HighlightOff color="error" />
                </IconButton>
              </Grid>
            )}
          </Grid>
        ))}
      {prop.length === 0 && <Typography></Typography>}
    </Paper>
  );

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
