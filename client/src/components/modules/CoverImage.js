import { Calculate } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";
const url =
  "https://objectstorage.ap-seoul-1.oraclecloud.com/n/cnylck3cahga/b/bucket-20230124-0355/o/coverImage.jpeg";

function CoverImage() {
  return (
    <Box
      sx={{
        height: "50%",
        position: "fixed",
        zIndex: "-1",
        overflow: "hidden",
        width: "100vw",
        top: 0,
      }}
    >
      <Box
        component="img"
        src={url}
        sx={{
          width: "100vw",
          Height: "50vh",
          overflow: "hidden",
        }}
      />
    </Box>
  );
}

export default CoverImage;
