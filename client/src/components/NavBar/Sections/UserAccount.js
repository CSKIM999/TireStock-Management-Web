import * as React from "react";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { GroupAdd, Login, Logout } from "@mui/icons-material";
import LoginModule from "../../modules/LoginModule";
import RegistModule from "../../modules/RegistModule";

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
      p: 0,
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
        <MenuItem id="login" sx={ItemSX("none", "flex")}>
          {/* <Button sx={{ px: 2, py: 1 }} startIcon={<Login />}>
            로그인
          </Button> */}
          {LoginModule(handleClose)}
          {/* <Login sx={{ pr: 0.5 }} />
          <Typography>로그인</Typography> */}
        </MenuItem>
        <MenuItem sx={ItemSX("none", "flex")}>
          {RegistModule(handleClose)}
          {/* <GroupAdd sx={{ pr: 0.5 }} />
          <Typography>회원가입</Typography> */}
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
