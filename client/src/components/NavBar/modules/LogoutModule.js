import { Login } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/userSlice";
const PC = ["Win", "Mac", "Lin"];
const userData = window.navigator.platform.slice(0, 3);
const Device = PC.indexOf(userData) >= 0 ? "PC" : "MOBILE";

const LogoutModule = (CloseMenu) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user.userId && user.token.length > 0 ? user.token : false;
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
