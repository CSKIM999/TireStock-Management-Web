import React from "react";
import { Button, Grid, Paper, Skeleton } from "@mui/material";
import ItemCard from "../../modules/ItemCard";
import { GetApp, KeyboardDoubleArrowDown } from "@mui/icons-material";
import EmptyBoard from "./EmptyBoard";
import { useSelector } from "react-redux";

function MatchItem(props) {
  let fill = [];

  if (props.renderData.length < 6) {
    fill = new Array(6 - props.renderData.length);
  }
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
  const itemLength = props.renderData.length;
  const bodyHeight =
    33 * parseInt(itemLength / 6) +
    16.5 * (itemLength % 6 === 0 ? 0 : itemLength % 6 < 3 ? 1 : 2);
  return (
    <>
      <Grid
        item
        container
        direction="row"
        sx={{
          pt: 3,
          minHeight: "33rem",
          height: `${bodyHeight}rem`,
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
      <Button
        size="large"
        onClick={() => {
          props.viewMore();
        }}
      >
        더보기
        <KeyboardDoubleArrowDown />
      </Button>
    </>
  );
};

export default ItemBoard;
