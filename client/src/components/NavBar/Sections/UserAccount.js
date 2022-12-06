import * as React from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { GroupAdd, Login, Logout } from "@mui/icons-material";
import LoginButton from "../../modules/LoginButton";

function UserAccount(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const ItemSX = (A, B) => {
    return {
      display: props.login ? A : B,
    };
  };
  return (
    <Box>
      <IconButton
        sx={{ color: "white", background: "background.info" }}
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
        <MenuItem id="login" onClick={handleClose} sx={ItemSX("none", "flex")}>
          <Login sx={{ pr: 0.5 }} />
          <Typography>로그인</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={ItemSX("none", "flex")}>
          <GroupAdd sx={{ pr: 0.5 }} />
          <Typography>회원가입</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={ItemSX("flex", "none")}>
          <Logout sx={{ pr: 0.5 }} />
          <Typography>로그아웃</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserAccount;
