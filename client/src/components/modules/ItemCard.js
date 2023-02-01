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
  const thumbNail = prop.thumbNail;
  console.log("🚀 ~ file: ItemCard.js:22 ~ ItemCard ~ thumbNail", thumbNail);
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

  return (
    <Card>
      <CardActionArea href={`./${prop.type}/${prop._id}`}>
        <Paper>
          <Grid container direction="row">
            <Grid
              item
              flexGrow={1}
              sx={{ display: "flex", justifyContent: "center", p: 1 }}
              md={5}
            >
              <Paper
                sx={{
                  width: "150px",
                  height: "150px",
                  bgcolor: `${thumbNail ? "" : "secondary.main"}`,
                }}
              >
                {thumbNail && (
                  <Box
                    component="img"
                    src={thumbNail}
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 3,
                    }}
                  />
                )}
              </Paper>
            </Grid>
            <Grid item md={7} sx={{ p: 1 }}>
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
