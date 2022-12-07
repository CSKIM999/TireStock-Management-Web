import { GroupAdd } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import isEmail from "validator/lib/isEmail";
import React from "react";
const RegistModule = (CloseMenu) => {
  const [DialogOpen, setDialog] = React.useState(false);
  const [Validate, setValidate] = React.useState(false);
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [Compare, setCompare] = React.useState("");
  const [NickName, setNickName] = React.useState("");
  React.useEffect(() => {}, []);
  const stateReset = () => {
    setEmail("");
    setPassword("");
    setCompare("");
    setNickName("");
  };
  const IsValid = (str) => {
    if (isEmail(str)) {
      setValidate(false);
    } else {
      setValidate(true);
    }
  };

  const handleSubmit = () => {
    IsValid(Email);
    if (isEmail(Email)) {
      if (Password !== Compare) {
        return alert("비밀번호가 일치하지 않습니다");
      }
      console.log(Email, Password, Compare, NickName);
      CloseMenu();
      setDialog(false);
      stateReset();
    } else {
      return alert("이메일 양식이 올바르지 않습니다");
    }
  };

  const handleDialog = () => {
    setDialog(false);
  };

  return (
    <Box>
      <Button
        sx={{ px: 2, py: 1 }}
        onClick={() => setDialog(true)}
        startIcon={<GroupAdd />}
      >
        회원가입
      </Button>
      <Dialog open={DialogOpen} onClose={handleDialog}>
        <DialogTitle>회원가입</DialogTitle>
        <Stack spacing={2} sx={{ px: 3, py: 2 }}>
          <TextField
            autoFocus
            id="email"
            label="아이디 / 이메일"
            type="email"
            error={Validate}
            helperText={!Validate ? "" : "올바른 이메일을 입력해주세요"}
            placeholder="DUMMY@gmail.com"
            variant="outlined"
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            id="password"
            label="비밀번호"
            placeholder="abcd1234"
            type="password"
            error={Password.length !== 0 && Password.length < 4}
            helperText={
              Password.length !== 0 && Password.length < 4
                ? "4글자 이상 입력해주세요"
                : ""
            }
            variant="outlined"
            onChange={(event) => setPassword(event.target.value)}
          />
          <TextField
            id="comparePassword"
            label="비밀번호 확인"
            placeholder="abcd1234"
            type="password"
            error={Compare.length !== 0 && Compare !== Password}
            helperText={
              Compare.length !== 0 && Compare !== Password
                ? "비밀번호를 확인해주세요"
                : ""
            }
            color={Compare.length >= 4 && Compare === Password ? "success" : ""}
            variant="outlined"
            onChange={(event) => setCompare(event.target.value)}
          />
          <TextField
            id="nickname"
            label="닉네임"
            type="text"
            placeholder="CHARLES"
            error={NickName.length !== 0 && NickName.length < 2}
            helperText={
              NickName.length !== 0 && NickName.length < 2
                ? "2글자 이상의 닉네임을 작성해주세요"
                : "2글자 이상의 닉네임을 작성해주세요"
            }
            variant="outlined"
            onChange={(event) => setNickName(event.target.value)}
          />
          <Stack direction="row-reverse">
            <Button onClick={handleSubmit}>로그인</Button>
            <Button onClick={handleDialog}>취소</Button>
          </Stack>
        </Stack>
      </Dialog>
    </Box>
  );
};

export default RegistModule;
