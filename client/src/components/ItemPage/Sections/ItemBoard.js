import React from "react";
import { Grid } from "@mui/material";
import ItemCard from "../../modules/ItemCard";
import EmptyBoard from "./EmptyBoard";

function MatchItem(props) {
  if (props.renderData) {
    if (props.renderData.length > 0) {
      return props.renderData.map((item, index) => (
        <Grid key={index} item xs={12} sm={6} lg={4}>
          <ItemCard prop={item} />
        </Grid>
      ));
    } else {
      return <EmptyBoard />;
    }
  }
}

const ItemBoard = (props) => {
  console.log(props.renderData.length);
  // React.useEffect(() => {

  // }, [props.renderData]);

  return (
    <Grid item container direction="row">
      {MatchItem(props)}
    </Grid>
  );
};

export default ItemBoard;
