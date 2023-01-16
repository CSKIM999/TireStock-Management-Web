import React from "react";
import * as Axios from "axios";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ItemDetailBody from "./Section/DetailBody";
import ItemDetailTitle from "./Section/DetailTitle";
import BreadCrumb from "../modules/BreadCrumb";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const itemBoxSX = "1px solid black";
const itemPaperSX = {
  width: "100%",
  height: "100%",
  bgcolor: "secondary.main",
};

const handleItem = (item, response) => {
  let temp = {
    title: "",
    type: "",
    data: {},
  };
  switch (item) {
    case "tires":
      temp.title = response.title;
      temp.type = response.type;
      temp.data.width = response.width ? response.width : "";
      temp.data.profile = response.profile ? response.profile : "";
      temp.data.size = response.size ? response.size : "";
      temp.data.condition = response.condition ? response.condition : "";
      temp.data.detail = response.detail ? response.detail : "";
      return temp;
    case "wheels":
      temp.title = response.title;
      temp.type = response.type;
      temp.data.region = response.region ? response.region : "";
      temp.data.size = response.size ? response.size : "";
      temp.data.design = response.design ? response.design : "";
      return temp;
    case "requests":
      temp.title = response.title;
      temp.type = response.state;
      temp.data.userID = response.writer._id;
      temp.data.detail = response.detail;
      temp.data.comment = response.comment;
      return temp;
    default:
      return false;
  }
};

function ItemDetailPage(props) {
  const navigate = useNavigate();
  const userID = useSelector((state) => state.user.userID);
  const [ControlFlag, setControlFlag] = React.useState(false);
  let { item, type, id } = useParams();
  if (props.type === "request") {
    item = "requests";
  }
  const [Body, setBody] = React.useState({
    title: "",
    type: "",
    data: {},
  });

  const AxiosBody = async () => {
    await Axios.get(`/api/${item}/${id}`)
      .then((response) => {
        if (response.data.success) {
          const authenticID =
            item === "requests"
              ? response.data.payload.writer._id
              : response.data.payload._id;
          if (authenticID === userID) setControlFlag(true);
          return setBody(handleItem(item, response.data.payload));
        }
        return console.log("Axios error");
      })
      .catch((err) => {
        console.log("ERROR CODE >> ", err);
        navigate(`/${item}/${type ? type : ""}`);
      });
  };
  React.useEffect(() => {
    if (!["requests", "tires", "wheels"].includes(item)) {
      console.log("== Wrong param ");
      navigate("/");
      return;
    }
    AxiosBody();
  }, [userID]);

  if (Body.title) {
    return (
      <Box sx={{ px: 10, pt: 5, height: "100%" }}>
        <Grid container flexWrap="nowrap" direction="column" height="100%">
          <Grid item xs={1}>
            {BreadCrumb(item, Body.type)}
            <ItemDetailTitle
              title={Body.title}
              item={item}
              ControlFlag={ControlFlag}
            />
          </Grid>
          <Divider />
          <Grid
            item
            xs={8}
            container
            direction="row"
            sx={{ py: 3, borderTop: itemBoxSX, borderBottom: itemBoxSX }}
          >
            {/* Image Section */}
            <Grid item xs={12} md={5.5} sx={{ pr: 2 }}>
              <Paper sx={itemPaperSX}></Paper>
            </Grid>
            {/* Detail Section */}
            <Grid item xs={12} md={6.5} minWidth={500}>
              <ItemDetailBody prop={Body.data} captureComment={AxiosBody} />
            </Grid>
          </Grid>
          <Button onClick={() => console.log(Body, ControlFlag)}>!!</Button>
        </Grid>
      </Box>
    );
  }
}

export default ItemDetailPage;
