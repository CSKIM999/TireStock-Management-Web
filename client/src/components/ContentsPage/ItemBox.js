import { ArrowForward } from "@mui/icons-material";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import * as React from "react";

function LandingItem() {
  return (
    <Box maxWidth="100%">
      <Stack direction="row" alignItems="center">
        <Typography>Recent Item</Typography>
        <IconButton component="a" href="/">
          <ArrowForward />
        </IconButton>
      </Stack>
      <Divider />
      <Stack>ITEMBODY</Stack>
    </Box>
  );
}

export default LandingItem;
