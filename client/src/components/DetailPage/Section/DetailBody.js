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
/**
 *
 * @param {object} props wheel => {region, design, size} // tire => {3-size, brand, condition}
 * @returns
 */
const ItemDetailBody = (props) => {
  // Deatil-Item => wheel 이라면 region, design, size 가 들어오고 tire 라면 size-3, brand, condition 이 들어옴
  // Detail-Req => ????
  const prop = props.prop;
  return (
    <Paper
      elevation={5}
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "background.paper",
      }}
    >
      <Grid
        container
        flexWrap="nowrap"
        direction={"column"}
        justifyContent="space-between"
        sx={{ height: "100%", px: 4, pt: 4, pb: 2 }}
      >
        {prop.width
          ? ProductInfo(prop)
          : DetailDescribe("문의내용", "FAQ", prop.detail)}
        <Divider sx={{ py: 1, mb: 2 }} />
        {!prop.width
          ? ItemComment(prop.comment)
          : DetailDescribe("Detail", "제품상세", prop.detail)}
      </Grid>
    </Paper>
  );
};
export default ItemDetailBody;
