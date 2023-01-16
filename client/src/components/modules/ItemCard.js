import {
  Box,
  Card,
  CardActionArea,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

function ItemCard({ prop }) {
  const title = prop.title;
  const width = prop.width;
  const size = prop.size;
  const profile = prop.profile;
  const brand = prop.brand;
  const region = prop.region;
  const condition = prop.condition;
  const design = prop.design;
  const headerContent = [
    title,
    width && size
      ? `${width} - ${profile} - R${size}`
      : size && size.length === 3
      ? `${size.slice(1)} Inch`
      : undefined,
  ];
  const bodyContent = [
    brand || region,
    condition ? `++ ${condition}%` : design,
  ];

  // const prop = props.prop;
  // const headerContent = [
  //   prop.title ? prop.title : undefined,
  //   prop.width && prop.size
  //     ? [prop.width, prop.profile, "R" + prop.size].join(" - ")
  //     : prop.size.length === 3
  //     ? prop.size.slice(1) + "Inch"
  //     : undefined,
  // ];
  // const bodyContnet = [
  //   prop.brand ? prop.brand : prop.region ? prop.region : undefined,
  //   prop.condition
  //     ? "++" + prop.condition + "%"
  //     : prop.design
  //     ? prop.design
  //     : undefined,
  // ];
  return (
    <Card>
      <CardActionArea href={`./${prop.type}/${prop._id}`}>
        <Paper>
          <Grid container direction="row">
            <Grid
              item
              flexGrow={1}
              sx={{ display: "flex", justifyContent: "center", p: 1 }}
              md={4}
            >
              {/* IMAGE */}
              <Paper
                sx={{
                  width: "150px",
                  height: "150px",
                  bgcolor: "secondary.main",
                }}
              />
            </Grid>
            {/* CONTENTS */}
            <Grid item md={8} sx={{ p: 1 }}>
              {headerContent &&
                headerContent.map((item, index) => (
                  <Typography key={index}>{item}</Typography>
                ))}
              {bodyContent &&
                bodyContent.map((item, index) => (
                  <Typography key={index}>{item}</Typography>
                ))}
            </Grid>
          </Grid>
        </Paper>
      </CardActionArea>
    </Card>
  );
}

export default ItemCard;
