import { Cookie, Login } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/userSlice";
const PC = ["Win", "Mac", "Lin"];
const userData = window.navigator.platform.slice(0, 3);
const Device = PC.indexOf(userData) >= 0 ? "PC" : "MOBILE";

const getCookie = (name) => {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const LogoutModule = (CloseMenu) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cookie = getCookie("x_auth");
  const token = cookie ? cookie : user.token;
  const handleClose = () => {
    dispatch(logoutUser(token));
    CloseMenu();
  };
  return (
    <Box>
      <Button
        sx={{ px: 2, py: 1 }}
        onClick={() => handleClose()}
        startIcon={<Login />}
      >
        로그아웃
      </Button>
    </Box>
  );
};

export default LogoutModule;
