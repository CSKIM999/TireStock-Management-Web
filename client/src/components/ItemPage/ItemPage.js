import React from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import OptionForWheel from "./util/OptionForWheel";
import ItemOption from "../modules/ItemOption";
import ItemCard from "../modules/ItemCard";

const gridItemOptionSX = { display: { xs: "none", md: "flex" } };
function getOptions(type) {
  console.log(type);
  if (type === "tires")
    return (
      <Grid container direction="row">
        <Grid item sx={gridItemOptionSX} md={1.5}>
          <ItemOption />
        </Grid>
        <Grid item sx={gridItemOptionSX} md={1.5}>
          <ItemOption />
        </Grid>
      </Grid>
    );
  else if (type === "wheels") return <OptionForWheel />;
}

function ItemPage(props) {
  return (
    <Grid container direction="column" sx={{ px: 10, py: 5 }}>
      <Grid item xs={2}>
        <Typography>TIRE &gt; {props.type}</Typography>
        {getOptions(props.item)}
      </Grid>
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
      <Button onClick={() => console.log(window.location.pathname, props.type)}>
        CHECK
      </Button>
    </Grid>
  );
}

export default ItemPage;
