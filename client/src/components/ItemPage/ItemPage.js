import React from "react";
import * as Axios from "axios";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import OptionBoard from "./Sections/OptionBoard";
import ItemBoard from "./Sections/ItemBoard";
import itemOptionTable, { getItems } from "../modules/itemOptionTable";
import BreadCrumb from "../modules/BreadCrumb";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/userSlice";
function ItemPage(props) {
  // tdz

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [SearchedItem, setSearchedItem] = React.useState([]);
  const [OptionValue, setOptionValue] = React.useState(
    props.item === "tires"
      ? new Array(5).fill("전체")
      : new Array(3).fill("전체")
  );
  const isAdmin = useSelector((state) => state.user.isAdmin);
  let { type } = useParams();
  let objectKeys;
  const tireKeys = Object.keys(itemOptionTable.tire);
  const wheelKeys = Object.keys(itemOptionTable.wheel);

  React.useEffect(() => {
    let optionalItems = [];
    const size = ["size", searchParams.get("size")];
    const profile = ["profile", searchParams.get("profile")];
    const width = ["width", searchParams.get("width")];
    const region = ["region", searchParams.get("region")];
    const design = ["design", searchParams.get("design")];
    let flag = false;
    if (size ?? profile ?? width ?? region ?? design ?? false) {
      if (props.item === "tires") {
        for (const [item, v] of [size, profile, width]) {
          if (v) {
            const table = itemOptionTable.tire[item].detail;
            const index = tireKeys.indexOf(item);
            // const index = objectKeys.indexOf(item);
            let value;
            if (table.includes(+v)) {
              value = table.findIndex((e) => e === +v) + 1;
            } else {
              value = table.findIndex((e) => e >= +v) + 1;
              flag = true;
            }
            optionalItems.push([index, value]);
          }
        }
      } else {
        // Wheel 의 경우도 체크해야함.
        if (size[1]) {
          const table = itemOptionTable.wheel.size.detail;
          const index = 2;
          // const index = objectKeys.indexOf(item);
          let value;
          if (table.includes(+size[1])) {
            value = table.findIndex((e) => e === +size[1]) + 1;
          } else {
            value = table.findIndex((e) => e >= +size[1]) + 1;
            flag = true;
          }
          optionalItems.push([index, value]);
        }
      }
      let newValue = [...OptionValue];
      for (const [i, v] of optionalItems) {
        newValue[i] = v;
      }
      setOptionValue([...newValue]);
      if (flag)
        alert(
          "입력된 사이즈와 정확히 일치하는 제품이 없어, 유사 사이즈로 검색합니다."
        );
    }
  }, []);

  React.useEffect(() => {
    let keywordURL = `/api/${props.item}/?type=${type}`;

    keywordURL = OptionValue.reduce((query, item, index) => {
      const keyword = props.item;
      const table = itemOptionTable;

      if (item !== "전체") {
        if (keyword === "tires") {
          const option = tireKeys[index];
          // const option = objectKeys[index];
          const value = table.tire[option].detail[item - 1];
          query += `&${option}=${value}`;
        } else {
          // const option = objectKeys[index];
          const option = wheelKeys[index];
          const value =
            item === 2 ? table.wheel[option].detail[item - 1] : item;
          query += `&${option}=${value}`;
        }
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
        <Box className="jcsb aic">
          {BreadCrumb(props.item, type)}
          {isAdmin ? (
            <Button variant="outlined" href={`/posts/${props.item}`}>
              재고등록
            </Button>
          ) : (
            <></>
          )}
        </Box>
        {OptionBoard(props.item, handleOption, OptionValue)}
      </Grid>
      <Paper className="full itemBoard-Paper">
        <ItemBoard renderData={SearchedItem} />
      </Paper>
    </Grid>
  );
}

export default ItemPage;
