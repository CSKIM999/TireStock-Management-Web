import React from "react";
import * as Axios from "axios";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import OptionBoard from "./Sections/OptionBoard";
import ItemBoard from "./Sections/ItemBoard";
import itemOptionTable from "./util/itemOptionTable";
import BreadCrumb from "../modules/BreadCrumb";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/userSlice";
const tireKeys = Object.keys(itemOptionTable.tire);
function ItemPage(props) {
  // tdz
  const dispatch = useDispatch();
  //

  const [OptionValue, setOptionValue] = React.useState(
    props.item === "tires"
      ? new Array(5).fill("전체")
      : new Array(3).fill("전체")
  );
  const [SearchedItem, setSearchedItem] = React.useState([]);
  let { type } = useParams();
  React.useEffect(() => {
    // TODO : Axios 사용해서 재고정보 가져오기 OptionValue : [전체]
    // 내가 원하는 중복제거 distinct
    let keywordURL = `/api/${props.item}/?type=${type}`;
    keywordURL = OptionValue.reduce((query, item, index) => {
      if (item !== "전체") {
        query += `&${tireKeys[index]}=${item}`;
      }
      return query;
    }, keywordURL);

    Axios.get(keywordURL).then((response) => {
      if (response) {
        setSearchedItem(response.data.payload);
      } else {
        console.log("axios error in ITEMPAGE");
      }
    });
  }, [OptionValue]);

  const handleOption = (index, value) => {
    let newValue = [...OptionValue];
    newValue[index] = value;
    setOptionValue([...newValue]);
  };

  return (
    <Grid container direction="column" sx={{ px: 10, py: 5 }}>
      <Grid item xs={2}>
        {BreadCrumb(props.item, type)}
        {OptionBoard(props.item, handleOption)}
      </Grid>
      <ItemBoard renderData={SearchedItem} />
      <Button
        onClick={() => {
          dispatch(
            loginUser({ body: { email: "test@te.st", password: "1234" } })
          );
        }}
      >
        CHECK
      </Button>
    </Grid>
  );
}

export default ItemPage;
