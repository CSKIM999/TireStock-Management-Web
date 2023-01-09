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
import LoginModule from "../modules/LoginModule";
import RegistModule from "../modules/RegistModule";
import LogoutModule from "../modules/LogoutModule";
import { useSelector } from "react-redux";

function UserAccount(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState(useSelector((state) => state.user));
  const userState = useSelector((state) => state.user);
  React.useEffect(() => {
    setUser(userState);
    console.log("USER STATE CHANGE DETECTED", user);
  }, [userState]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const ItemSX = (map) => {
    return {
      display: user.userID && user.userID.length > 0 ? map.alpha : map.beta,
      p: 0,
    };
  };
  const itemMap = {
    login: { alpha: "none", beta: "flex" },
    logout: { beta: "none", alpha: "flex" },
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
        <MenuItem id="login" sx={ItemSX(itemMap.login)}>
          {/* <Button sx={{ px: 2, py: 1 }} startIcon={<Login />}>
            로그인
          </Button> */}
          {LoginModule(handleClose)}
          {/* <Login sx={{ pr: 0.5 }} />
          <Typography>로그인</Typography> */}
        </MenuItem>
        <MenuItem sx={ItemSX(itemMap.login)}>
          {RegistModule(handleClose)}
          {/* <GroupAdd sx={{ pr: 0.5 }} />
          <Typography>회원가입</Typography> */}
        </MenuItem>
        <MenuItem sx={ItemSX(itemMap.logout)}>
          {LogoutModule(handleClose)}
          {/* <Logout sx={{ pr: 0.5 }} />
          <Typography>로그아웃</Typography> */}
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserAccount;
