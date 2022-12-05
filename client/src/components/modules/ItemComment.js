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

const commentInput = () => {};

const commentRender = () => {};

const ItemComment = (props) => {
  React.useEffect(() => {}, []);
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
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxHeight: 250,
            overflow: "auto",
          }}
        >
          {props.length > 0 &&
            props.map((item, index) => (
              <Grid item container key={index} sx={{ py: 0.5 }}>
                {/* Writer */}
                <Grid item xs={2}>
                  <Typography sx={{ pr: 2 }}>{item.writer}</Typography>
                </Grid>
                {/* COMMENT */}
                <Grid item>
                  <Typography>{item.comment}</Typography>
                </Grid>
                {/* BUTTONBOX */}
                <Grid item></Grid>
              </Grid>
            ))}
          {props.length === 0 && <Typography></Typography>}
        </Paper>
      </Grid>
      <Grid item xs={1} sx={{ height: "100%" }}>
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
          <Button variant="contained" endIcon={<MapsUgc />} color="primary">
            ENTER
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ItemComment;
