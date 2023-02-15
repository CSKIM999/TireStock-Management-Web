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
const EMPTY = process.env.REACT_APP_EMPTY;
function PreviewItems(item, type) {
  // query page 정보에 limit 넣어주기
  const [body, setBody] = React.useState([]);
  React.useEffect(() => {
    const reqURL = `/api/${item}/?type=${type}`;
    Axios.get(reqURL).then((response) => {
      setBody(response.data.payload);
    });
  }, []);
  const convertToCard = (props) => {
    const size = props.size;
    const thumbNail = props.thumbNail;
    const type = props.type;
    const _id = props._id;
    return (
      <Card sx={{ height: "auto" }}>
        <CardActionArea href={`/wheels/${type}/${_id}`}>
          <CardMedia
            component="img"
            sx={{ maxHeight: "80px" }}
            image={thumbNail ?? EMPTY}
          />
          <CardContent sx={{ p: 0, display: "flex", justifyContent: "center" }}>
            <Typography variant="caption" className="previewCard">
              {size} 인치
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };
  const convertByItem = (data) => {
    if (data.length === 0) return;
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
          {data.map((item, index) => {
            const brand = item.brand ? item.brand : "Brand  ";
            const size = tireString(item);
            const condition = "++" + item.condition + "%";
            return (
              <ListItemButton
                key={"prev-" + index}
                sx={{
                  borderBottom: "1px solid",
                  px: 0,
                  pb: 0.5,
                  alignItems: "flex-end",
                }}
                href={`/tires/${item.type}/${item._id}`}
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
      const type = data[0].type;

      return (
        <Grid
          container
          direction="column"
          sx={{
            height: "100%",
            maxWidth: "13rem",
            justifyContent: "space-around",
          }}
        >
          <Grid item xs={1} display="flex" justifyContent="center">
            <Typography>{type.toUpperCase()}</Typography>
          </Grid>
          <Grid item container xs={11} sx={{ justifyContent: "space-around" }}>
            {data.map((item, index) => {
              return (
                <Grid item key={"wheel-" + type + "-" + index} xs={5}>
                  {convertToCard(item)}
                </Grid>
              );
            })}
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
        className="full preview"
        sx={{
          p: 2,
          borderRadius: 3,
          minWidth: "15rem",
          minHeight: "25rem",
        }}
      >
        {convertByItem(body)}
      </Paper>
    </Box>
  );
}

export default PreviewItems;
