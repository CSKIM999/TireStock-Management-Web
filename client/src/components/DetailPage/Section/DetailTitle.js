import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

const ItemDetailTitle = (props) => {
  console.log("DETAIL TITLE PROPS : ", props);
  const ControlerRender = () => {
    if (props.ControlFlag)
      return (
        <Box>
          <Button>REMOVE</Button>
          <Button>ADJ</Button>
        </Box>
      );
    return <Box></Box>;
  };
  return (
    <Stack direction="row" justifyContent="space-between">
      <Box>
        <Typography color="primary.main" variant="h5" fontWeight="bold">
          {props.title}
        </Typography>
      </Box>
      <ControlerRender />
    </Stack>
  );
};

export default ItemDetailTitle;
