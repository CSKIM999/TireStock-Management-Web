import React from "react";
import { Box, Button, Stack } from "@mui/material";
import FAQItem from "../util/FAQItem";

function RequsetSection(props) {
  return (
    <Stack display={props.tab === 0 ? "block" : "none"}>
      <Box
        sx={{
          display: "flex",
          borderBottom: "2px solid white",
          justifyContent: "space-between",
          py: 2,
        }}
      >
        <Button>문의하기</Button>
        <Button>문의하기</Button>
      </Box>
      {FAQItem("success", "ITEM TITLE", "YYYY/MM/DD")}
      {FAQItem("pending", "ITEM TITLE2", "YYYY/MM/DD")}
    </Stack>
  );
}

export default RequsetSection;
