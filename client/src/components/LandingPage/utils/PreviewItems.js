import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
} from "@mui/material";
import * as Axios from "axios";
import React from "react";
const tireString = (item) => {
  return item.width + " - " + item.profile + " - " + item.size;
};
function PreviewItems(item, type) {
  // query page 정보에 limit 넣어주기
  const [body, setBody] = React.useState([]);
  React.useEffect(() => {
    const reqURL = `/api/${item}/?type=${type}`;
    Axios.get(reqURL).then((response) => {
      setBody(response.data.payload);
    });
  }, []);
  const convertToCard = (item) => {
    return (
      <Card>
        <CardActionArea>
          <CardMedia component="div" sx={{ width: "100px", height: "100px" }} />
          <CardContent>
            <Typography variant="caption">19 INCH</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };
  const convertByItem = (data) => {
    const errorcode = "ERROR IN PREVIEW ITEMS";
    if (item === "tires") {
      return (
        <List
          subheader={
            <Typography sx={{ display: "flex", justifyContent: "center" }}>
              {type.toUpperCase()}
            </Typography>
          }
        >
          {data &&
            data.map((item, index) => {
              const brand = item.brand ? item.brand : "Brand  ";
              const size = tireString(item);
              const condition = "++" + item.condition + "%";
              return (
                <ListItemButton
                  key={"prev-" + index}
                  sx={{ borderBottom: "1px solid", px: 0, pb: 0.5 }}
                >
                  <Typography variant="caption">{brand}</Typography>
                  <Typography fontWeight="bold" sx={{ px: 2 }}>
                    {size}
                  </Typography>
                  <Typography variant="caption">{condition}</Typography>
                </ListItemButton>
              );
            })}{" "}
        </List>
      );
    } else if (item === "wheels") {
      return (
        <Grid container direction="column">
          <Grid item xs={1}>
            <Typography>HI</Typography>
          </Grid>
          <Grid item container xs={5}>
            <Grid item xs={6} sx={{ width: "100%" }}>
              {convertToCard()}
            </Grid>
            <Grid item xs={6}>
              {convertToCard()}
            </Grid>
          </Grid>
          <Grid item container xs={5}>
            <Grid item xs={6}>
              {convertToCard()}
            </Grid>
            <Grid item xs={6}>
              {convertToCard()}
            </Grid>
          </Grid>
        </Grid>
      );
    } else {
      alert(errorcode);
    }
  };
  return (
    <Box>
      <Paper
        elevation={24}
        className="PreviewItems"
        sx={{
          p: 2,
          borderRadius: 3,
          backgroundColor: "primary.main",
          minWidth: "15rem",
        }}
      >
        {/* {body && body.map((item,index) => )} */}
        {convertByItem(body)}
      </Paper>
    </Box>
  );
}

export default PreviewItems;
