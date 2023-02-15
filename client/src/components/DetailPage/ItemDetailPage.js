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
import ImageSlider from "./Section/ImageSlider";

const itemBoxSX = "1px solid black";

const handleItem = (item, response) => {
  let temp = {
    title: "",
    type: "",
    data: {},
  };
  if (item === "tires") {
    temp.data.width = response.width ? response.width : "";
    temp.data.profile = response.profile ? response.profile : "";
    temp.data.size = response.size ? response.size : "";
    temp.data.condition = response.condition ? response.condition : "";
  } else if (item === "wheels") {
    temp.data.region = response.region ? response.region : "";
    temp.data.size = response.size ? response.size : "";
    temp.data.design = response.design ? response.design : "";
  } else if (item === "requests") {
    temp.data.userID = response.writer._id;
    temp.data.comment = response.comment;
    temp.state = response.state;
  }
  temp.title = response.title;
  temp.type = response.type;
  temp.data.detail = response.detail ? response.detail : "";
  temp.data.image = response.image ? response.image : [];
  return temp;
};

function ItemDetailPage(props) {
  const navigate = useNavigate();
  const userID = useSelector((state) => state.user.userID);
  const isAdmin = useSelector((state) => state.user.isAdmin);
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
          if (authenticID === userID || isAdmin) setControlFlag(true);
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
              state={Body.state}
              ControlFlag={ControlFlag}
            />
          </Grid>
          <Divider />
          <Grid item xs={8} container direction="row" sx={{ py: 3 }}>
            {/* Image Section */}

            <ImageSlider images={Body.data.image} />
            {/* Detail Section */}
            <Grid item xs={12} md={6.5} minWidth={500}>
              <ItemDetailBody prop={Body.data} captureComment={AxiosBody} />
            </Grid>
          </Grid>
          <Divider />
          <Button
            onClick={() => {
              console.log(Body, ControlFlag);
            }}
          >
            !!
          </Button>
        </Grid>
      </Box>
    );
  }
}

export default ItemDetailPage;
