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
  const [body, setBody] = React.useState([]);
  React.useEffect(() => {
    // query page 정보에 limit 넣어주기
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
          <CardContent className="jccc" sx={{ p: 0 }}>
            <Typography variant="caption" className="previewCard">
              {size} 인치
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };
  const convertToListItem = (item, index) => {
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
  };
  const convertByItem = (previewData) => {
    if (previewData.length === 0) return;
    const errorcode = "ERROR IN PREVIEW ITEMS";
    if (item === "tires") {
      return (
        <List
          subheader={
            <Typography className="jccc">{type.toUpperCase()}</Typography>
          }
        >
          {previewData.map((item, index) => {
            return convertToListItem(item, index);
          })}
        </List>
      );
    } else if (item === "wheels") {
      const type = previewData[0].type;
      if (previewData.length < 6) {
        const dummy = new Array(6 - previewData.length);
        previewData = [...previewData, ...dummy];
      } else {
        previewData.splice(6);
      }
      console.log(
        "🚀 ~ file: PreviewItems.js:98 ~ convertByItem ~ previewData:",
        previewData
      );
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
          <Grid item container xs={11} className="jcsa">
            {previewData.map((item, index) => {
              if (!item)
                return (
                  <Grid
                    item
                    className="ha prevDummy"
                    key={`dummy+${index}`}
                    xs={5}
                  ></Grid>
                );
              return (
                <Grid
                  item
                  className="ha"
                  key={"wheel-" + type + "-" + index}
                  xs={5}
                >
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
