import * as React from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { GroupAdd, Login, Logout } from "@mui/icons-material";

function LoginButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <Box>
      <IconButton
        sx={{ color: "white", background: "black" }}
        onClick={handleClick}
      >
        <GroupAdd />
      </IconButton>
      <Menu
        id="user"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{
            display: props.login ? "none" : "flex",
          }}
        >
          <Login sx={{ pr: 0.5 }} />
          <Typography></Typography>
          로그인
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            display: props.login ? "none" : "flex",
          }}
        >
          <GroupAdd sx={{ pr: 0.5 }} />
          회원가입
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            display: props.login ? "flex" : "none",
          }}
        >
          <Logout sx={{ pr: 0.5 }} />
          로그아웃
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default LoginButton;
