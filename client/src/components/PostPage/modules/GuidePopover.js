import { Help } from "@mui/icons-material";
import { Box, Popover, Typography } from "@mui/material";
import React from "react";

function GuidePopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <>
      <Help
        sx={{ ml: 1, color: "secondary.main" }}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      />
      <Popover
        open={open}
        sx={{
          pointerEvents: "none",
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        transitionDuration={150}
        disableRestoreFocus
      >
        <Box component="img" sx={{ maxWidth: "30rem" }} src={props.imageURL} />
      </Popover>
    </>
  );
}

export default GuidePopover;
