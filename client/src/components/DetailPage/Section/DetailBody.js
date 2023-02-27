import React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import DetailDescribe from "../../modules/DetailDescribe";
import ProductInfo from "./ProductInfo";
import ItemComment from "../../modules/ItemComment";

// /**
//  *
//  * @param {object} props wheel => {region, design, size} // tire => {3-size, brand, condition}
//  * @returns
//  */
const ItemDetailBody = (props) => {
  const prop = props.prop;
  const captureComment = props.captureComment;
  let describeMain, descibeSub;
  switch (props.state) {
    case "notice":
      describeMain = "공지사항";
      descibeSub = "NOTICE";
      break;
    case "FAQ":
      describeMain = "자주묻는질문";
      descibeSub = "FAQ";
      break;
    default:
      describeMain = "문의내용";
      descibeSub = "REQUEST";
      break;
  }
  if (["notice", "FAQ"].includes(props.state)) {
  }
  return (
    <Paper elevation={0} className="full itemDetail-Paper">
      <Grid
        container
        flexWrap="nowrap"
        direction={"column"}
        justifyContent="space-between"
        sx={{ height: "100%", px: 4, pt: 4, pb: 2 }}
      >
        {prop.size
          ? ProductInfo(prop)
          : DetailDescribe(describeMain, descibeSub, prop.detail)}
        <Divider sx={{ py: 1, mb: 2 }} />
        {!prop.size
          ? ItemComment(prop.comment, captureComment)
          : DetailDescribe("Detail", "제품상세", prop.detail)}
      </Grid>
    </Paper>
  );
};
export default ItemDetailBody;
