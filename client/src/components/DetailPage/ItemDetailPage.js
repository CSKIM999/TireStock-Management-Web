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
import { useParams } from "react-router-dom";

const itemBoxSX = "1px solid black";
const itemPaperSX = {
  width: "100%",
  height: "100%",
  bgcolor: "secondary.main",
};

function ItemDetailPage(props) {
  // const prop = props.prop;
  const prop = {
    request: "item",
    item: "tires",
    type: "new",
    data: {
      width: 265,
      profile: 45,
      size: 19,
      brand: "금호타이어",
      condition: 90,
    },
    title: "금호 마제스티 솔루스",
  };

  // TODO : axios 통해서 item 일경우, request 일 경우 따져서 param id 사용해서 해당 detail 가져오기
  let { id } = useParams();
  if (prop.request && prop.request === "item") {
    // id 가지고 정보 받아오기
    // db에 id가 없다면 정보와 함께 에러창 발생
  }

  const TitleTag = `${prop.item.toUpperCase()} > ${prop.type.toUpperCase()}`;

  return (
    <Box sx={{ px: 10, pt: 5, height: "100%" }}>
      <Grid container flexWrap="nowrap" direction="column" height="100%">
        <Grid item xs={1}>
          {BreadCrumb(prop.item, prop.type)}
          <ItemDetailTitle title={prop.title} />
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
            <ItemDetailBody type={prop.item} prop={prop.data} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ItemDetailPage;
