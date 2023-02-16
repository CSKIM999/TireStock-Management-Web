import {
  Box,
  Card,
  CardActionArea,
  Divider,
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
  const headerContent = [
    title,
    width && size
      ? `${width} - ${profile} - R${size}`
      : size
      ? `${size} Inch`
      : undefined,
  ];
  const bodyContent = [
    brand || region,
    condition ? `++ ${condition}%` : design,
  ];

  return (
    <Card elevation={0}>
      <CardActionArea href={`./${prop.type}/${prop._id}`}>
        <Paper className="Plevel1">
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
                  <Box className="full br3" component="img" src={thumbNail} />
                )}
              </Paper>
            </Grid>
            <Grid item md={7} sx={{ p: 1 }}>
              {headerContent &&
                headerContent.map((item, index) => (
                  <Typography variant="h6" fontWeight="bold" key={index}>
                    {item}
                  </Typography>
                ))}
              <Divider sx={{ border: 0, py: 1 }} />
              {bodyContent &&
                bodyContent.map((item, index) => (
                  <Typography component="div" variant="caption" key={index}>
                    {item}
                  </Typography>
                ))}
            </Grid>
          </Grid>
        </Paper>
      </CardActionArea>
    </Card>
  );
}

export default ItemCard;
