import React from "react";
import { Grid, Paper } from "@mui/material";
import ItemCard from "../../modules/ItemCard";
import EmptyBoard from "./EmptyBoard";

function MatchItem(props) {
  if (props.renderData) {
    if (props.renderData.length > 0) {
      return props.renderData.map((item, index) => (
        <Grid
          key={index}
          className="card-Grid"
          item
          xs={5.5}
          lg={3.5}
          sx={{ height: "10.5rem" }}
        >
          <ItemCard prop={item} />
        </Grid>
      ));
    } else {
      return <EmptyBoard />;
    }
  }
}

const ItemBoard = (props) => {
  const fill = new Array(6 - props.renderData.length).fill(0);
  return (
    <Grid
      item
      container
      direction="row"
      sx={{
        py: 5,
        minHeight: "33rem",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {MatchItem(props)}
      {fill.length > 0 &&
        fill.length < 6 &&
        fill.map((v, index) => {
          return (
            <Grid
              key={index + v}
              item
              xs={5.5}
              lg={3.5}
              sx={{ height: "10.5rem" }}
            ></Grid>
          );
        })}
    </Grid>
  );
};

export default ItemBoard;
