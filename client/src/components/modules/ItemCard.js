import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";

function ItemCard() {
  const props = {
    title: "금호 마제스티 솔루스",
    width: 245,
    profile: 30,
    size: "R19",
    brand: "금호타이어",
    condition: 90,
  };

  const headerContent = [
    props.title ? props.title : undefined,
    props.width && props.size
      ? [props.width, props.profile, props.size].join(" - ")
      : props.size.length === 3
      ? props.size.slice(1) + "Inch"
      : undefined,
  ];
  const bodyContnet = [
    props.brand ? props.brand : props.region ? props.region : undefined,
    props.condition
      ? "++" + props.condition + "%"
      : props.design
      ? props.design
      : undefined,
  ];
  return (
    <Box sx={{ height: "100%", width: "100%", p: 2 }}>
      <Paper>
        <Grid container direction="row">
          <Grid
            item
            flexGrow={1}
            sx={{ display: "flex", justifyContent: "center", p: 1 }}
            md={4}
          >
            <Paper
              sx={{
                width: "150px",
                height: "150px",
                bgcolor: "secondary.main",
              }}
            />
          </Grid>
          <Grid item md={8} sx={{ p: 1 }}>
            {headerContent &&
              headerContent.map((item, index) => (
                <Typography key={index}>{item}</Typography>
              ))}
            {bodyContnet &&
              bodyContnet.map((item, index) => (
                <Typography key={index}>{item}</Typography>
              ))}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default ItemCard;
