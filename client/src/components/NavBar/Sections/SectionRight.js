import React from "react";
import { Button, Toolbar } from "@mui/material";
import { GroupAdd, Login, Logout } from "@mui/icons-material";

function SectionRight(props) {
  return (
    <Toolbar sx={{ p: 0, right: 0 }}>
      <Button
        key="login"
        sx={{
          display: props.login ? "none" : "flex",
          color: "white",
          fontSize: ".8rem",
        }}
      >
        <Login sx={{ pr: 0.5 }} />
        로그인
      </Button>
      <Button
        key="regist"
        sx={{
          display: props.login ? "none" : "flex",
          color: "white",
          fontSize: ".8rem",
        }}
      >
        <GroupAdd sx={{ pr: 0.5 }} />
        회원가입
      </Button>
      <Button
        key="logout"
        sx={{
          display: props.login ? "flex" : "none",
          color: "white",
          fontSize: ".8rem",
        }}
      >
        <Logout sx={{ pr: 0.5 }} />
        로그아웃
      </Button>
    </Toolbar>
  );
}

export default SectionRight;
