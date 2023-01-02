import React from "react";
import { Box, Typography } from "@mui/material";
/**
 *
 * @param {string} item {Item} > type , REQ
 * @param {string} type Item > {type} , OPT
 * @returns
 */
const BreadCrumb = (item, type = undefined) => {
  return (
    <Box sx={{ py: 1 }}>
      <Typography variant="caption">
        {type
          ? `${item.toUpperCase()} > ${type.toUpperCase()}`
          : `${item.toUpperCase()}`}
      </Typography>
    </Box>
  );
};

export default BreadCrumb;
