import * as React from "react";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { GroupAdd, Login, Logout, AccountBox } from "@mui/icons-material";
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
      <IconButton className="user-Button" onClick={handleClick}>
        <AccountBox fontSize="large" />
      </IconButton>
      <Menu
        id="user"
        className="useAccountMenu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem id="login" sx={ItemSX(itemMap.login)}>
          {LoginModule(handleClose)}
        </MenuItem>
        <MenuItem sx={ItemSX(itemMap.login)}>
          {RegistModule(handleClose)}
        </MenuItem>
        <MenuItem sx={ItemSX(itemMap.logout)}>
          {LogoutModule(handleClose)}
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserAccount;
