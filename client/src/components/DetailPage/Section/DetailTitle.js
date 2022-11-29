import React from "react";
import { Stack, Typography } from "@mui/material";

const ItemDetailTitle = (props) => {
  return (
    <Stack spacing={2}>
      <Typography color="primary.main" variant="h5" fontWeight="bold">
        {props.title}
      </Typography>
    </Stack>
  );
};

export default ItemDetailTitle;