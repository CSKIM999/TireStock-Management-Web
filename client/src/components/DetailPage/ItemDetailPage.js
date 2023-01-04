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
      temp.type = undefined;
      temp.data.detail = response.detail;
      temp.data.comment = response.comment;
      return temp;
    default:
      return false;
  }
};

function ItemDetailPage(props) {
  const navigate = useNavigate();
  let { item, type, id } = useParams();
  if (props.type === "request") {
    item = "requests";
  }
  const [Body, setBody] = React.useState({
    title: "",
    type: "",
    data: {},
  });

  const AxiosBody = () => {
    console.log("axios !", type);
    Axios.get(`/api/${item}/${id}`)
      .then((response) => {
        if (response) {
          setBody(handleItem(item, response.data.payload));
        } else {
          console.log("axios error");
        }
      })
      .catch((err) => {
        console.log("ERROR >> ", err.code);
        navigate(`/${item}/${type ? type : ""}`);
      });
    console.log(item, id);
  };
  React.useEffect(() => {
    if (!["requests", "tires", "wheels"].includes(item)) {
      console.log("== Wrong param ");
      navigate("/");
      return;
    }
    AxiosBody();
  }, []);

  if (Body.title) {
    return (
      <Box sx={{ px: 10, pt: 5, height: "100%" }}>
        <Grid container flexWrap="nowrap" direction="column" height="100%">
          <Grid item xs={1}>
            {BreadCrumb(item, Body.type)}
            <ItemDetailTitle title={Body.title} />
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
        </Grid>
      </Box>
    );
  }
}

export default ItemDetailPage;
