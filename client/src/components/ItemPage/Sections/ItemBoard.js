import React from "react";
import { Grid } from "@mui/material";
import ItemCard from "../../modules/ItemCard";
import itemOptionTable from "../util/itemOptionTable";
const ItemBoard = (props) => {
  React.useEffect(() => {
    console.log("EFFECT IN ITEMBOARD ", props.renderData);
    console.log();
  }, [props.renderData]);

  return (
    <Grid item container direction="row">
      <Grid item xs={12} sm={6} lg={4}>
        <ItemCard />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <ItemCard />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <ItemCard />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <ItemCard />
      </Grid>
    </Grid>
  );
};

export default ItemBoard;
