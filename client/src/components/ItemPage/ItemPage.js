import React from "react";
import * as Axios from "axios";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import OptionBoard from "./Sections/OptionBoard";
import ItemBoard from "./Sections/ItemBoard";
import itemOptionTable from "./util/itemOptionTable";
const tireKeys = Object.keys(itemOptionTable.tire);
function ItemPage(props) {
  const [OptionValue, setOptionValue] = React.useState(
    props.item === "tires"
      ? new Array(5).fill("전체")
      : new Array(3).fill("전체")
  );
  const [SearchedItem, setSearchedItem] = React.useState([]);

  React.useEffect(() => {
    console.log("USE-EFFECT", OptionValue);
    // TODO : Axios 사용해서 재고정보 가져오기 OptionValue : [전체]
    // 내가 원하는 중복제거 distinct
    var keywordURL = "/api/tires/?type=used";
    OptionValue.map((item, index) => {
      if (item !== "전체") {
        keywordURL += `&${tireKeys[index]}=${item}`;
      }
    });

    Axios.get(keywordURL).then((response) => {
      if (response) {
        setSearchedItem(response.data.payload);
      } else {
        console.log("axios error");
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
        <Typography>TIRE &gt; {props.type}</Typography>
        {OptionBoard(props.item, handleOption)}
      </Grid>
      <ItemBoard renderData={SearchedItem} />
      <Button onClick={() => console.log(window.location.pathname, props.type)}>
        CHECK
      </Button>
    </Grid>
  );
}

export default ItemPage;
