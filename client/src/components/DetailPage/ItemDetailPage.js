import React from "react";
import * as Axios from "axios";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ItemDetailBody from "./Section/DetailBody";
import ItemDetailTitle from "./Section/DetailTitle";
import BreadCrumb from "../modules/BreadCrumb";
import { useNavigate, useParams } from "react-router-dom";

const itemBoxSX = "1px solid black";
const itemPaperSX = {
  width: "100%",
  height: "100%",
  bgcolor: "secondary.main",
};

function ItemDetailPage(props) {
  const navigate = useNavigate();
  // const prop = props.prop;
  // const prop = {
  //   item: "tires",
  //   type: "new",
  //   data: {
  //     width: 265,
  //     profile: 45,
  //     size: 19,
  //     brand: "금호타이어",
  //     condition: 90,
  //   },
  //   title: "금호 마제스티 솔루스",
  // };
  let body = {
    title: "",
    type: "",
    data: {},
    flag: false,
  };
  // TODO : axios 통해서 item 일경우, request 일 경우 따져서 param id 사용해서 해당 detail 가져오기
  let { item, id } = useParams();
  if (["tires", "wheels", "requests"].includes(item)) {
    Axios.get(`/api/${item}/${id}`).then((response) => {
      if (response) {
        const res = response.data.payload;
        body.flag = true;
        body.title = res.title;
        body.type = res.type;
        body.data.width = res.width;
        body.data.profile = res.profile;
        body.data.size = res.size;
        body.data.condition = res.condition;
        body.data.size = res.size;
        console.log(body);
      } else {
        console.log("axios error");
        navigate("/");
      }
    });
    // console.log(id);
    // id 가지고 정보 받아오기
    // db에 id가 없다면 정보와 함께 에러창 발생
  } else {
    navigate("/");
  }

  console.log("must be here", item, body);
  return (
    <Box sx={{ px: 10, pt: 5, height: "100%" }}>
      <Grid container flexWrap="nowrap" direction="column" height="100%">
        <Grid item xs={1}>
          {BreadCrumb(item, body.type)}
          <ItemDetailTitle title={body.title} />
        </Grid>
        <Divider />
        <Grid
          item
          xs={8}
          container
          direction="row"
          sx={{ py: 3, borderTop: itemBoxSX, borderBottom: itemBoxSX }}
        >
          {/* Image Section */}
          <Grid item xs={12} md={5.5} sx={{ pr: 2 }}>
            <Paper sx={itemPaperSX}></Paper>
          </Grid>
          {/* Detail Section */}
          <Grid item xs={12} md={6.5} minWidth={500}>
            <ItemDetailBody prop={body.data} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ItemDetailPage;
