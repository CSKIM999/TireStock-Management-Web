import React from "react";
import { Grid, Paper, Skeleton } from "@mui/material";
import ItemCard from "../../modules/ItemCard";
import EmptyBoard from "./EmptyBoard";
import { useSelector } from "react-redux";

function MatchItem(props) {
  const fill = new Array(6 - props.renderData.length);
  const renderData = [...props.renderData, ...fill];
  if (renderData[0]) {
    return renderData.map((item, index) => {
      if (item)
        return (
          <Grid
            key={index}
            className="card-Grid"
            item
            xs={5.5}
            lg={3.5}
            // sx={{ height: "10.5rem" }}
          >
            <ItemCard prop={item} />
          </Grid>
        );
      return (
        <Grid
          className="card-Grid dummy"
          key={"dummy" + index}
          item
          xs={5.5}
          lg={3.5}
        ></Grid>
      );
    });
  } else {
    return <EmptyBoard />;
  }
}

const ItemBoard = (props) => {
  const dummy = [...new Array(6)].map((_, i) => i + 1);
  const loading = useSelector((state) => state.data.Loading);
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
      {!loading && MatchItem(props)}
      {loading &&
        dummy.map((_, i) => (
          <Grid key={"dummy" + i} item xs={5.5} lg={3.5}>
            <Skeleton
              className="itemCard-Skeleton"
              variant="rounded"
              height="11rem"
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default ItemBoard;
