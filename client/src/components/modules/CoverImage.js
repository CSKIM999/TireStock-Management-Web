import { Box } from "@mui/material";
import React from "react";
const url =
  "https://objectstorage.ap-seoul-1.oraclecloud.com/n/cnylck3cahga/b/bucket-20230124-0355/o/coverImage.jpeg";

function CoverImage() {
  const path = window.location.pathname;
  return (
    <Box
      sx={{
        display: `${path === "/" ? "block" : "none"}`,
        height: "50%",
        position: "absolute",
        zIndex: "-1",
        overflow: "hidden",
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
