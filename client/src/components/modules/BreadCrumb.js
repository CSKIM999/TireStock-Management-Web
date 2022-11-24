import React from "react";
import { Box, Typography } from "@mui/material";
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
