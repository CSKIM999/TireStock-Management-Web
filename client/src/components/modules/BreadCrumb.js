import React from "react";
import { Box, Typography } from "@mui/material";
const BreadCrumb = (item, type) => {
  return (
    <Box sx={{ py: 1 }}>
      <Typography variant="caption">
        {item.toUpperCase()} &gt; {type.toUpperCase()}
      </Typography>
    </Box>
  );
};

export default BreadCrumb;
