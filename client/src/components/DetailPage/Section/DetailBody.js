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
/**
 *
 * @param {object} props wheel => {region, design, size} // tire => {3-size, brand, condition}
 * @returns
 */
const ItemDetailBody = (props) => {
  // Deatil-Item => wheel 이라면 region, design, size 가 들어오고 tire 라면 size-3, brand, condition 이 들어옴
  // Detail-Req => ????
  const prop = props.prop;
  console.log("ID", prop);
  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "secondary.main",
      }}
    >
      <Grid
        container
        flexWrap="nowrap"
        direction={"column"}
        sx={{ height: "100%", px: 4, pt: 4 }}
      >
        {ProductInfo(prop)}
        <Divider sx={{ py: 1, mb: 2 }} />
        {DetailDescribe("Detail", "제품상세", prop.detail)}
      </Grid>
    </Paper>
  );
};
export default ItemDetailBody;
