import React from "react";
import { Box, Typography } from "@mui/material";
/**
 *
 * @param {string} item {Item} / type , 슬래쉬 앞에 들어갈 maintitle
 * @param {string} type Item / {type} , 슬래쉬 뒤에 들어갈 subtitle
 * @param {string} subitem Item / type _{subtitle} , 아이템 뒤에 들어갈 subItem
 * @returns
 */
const BreadCrumb = (item, type = undefined, subitem = undefined) => {
  return (
    <Box className="pt2 pb2 aife">
      <Typography className="crumb-Typo" component="span">
        {["notice", "FAQ"].includes(type)
          ? `${item.toUpperCase()} / ${type.toUpperCase()}`
          : `${item.toUpperCase()}`}
      </Typography>
      {subitem ? (
        <Typography className="fwb px3" variant="caption">
          {subitem}
        </Typography>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default BreadCrumb;
