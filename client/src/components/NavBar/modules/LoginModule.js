import { Login } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import isEmail from "validator/lib/isEmail";
import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../store/userSlice";
const LoginModule = (CloseMenu) => {
  const [DialogOpen, setDialog] = React.useState(false);
  const [Validate, setValidate] = React.useState(false);
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  React.useEffect(() => {}, []);

  const keyDownTab = (event) => {
    console.log("KEYDOWN TAB");
    event.stopPropagation();
  };
  const keyDownEnter = (event) => {
    console.log("KEYDOWN ENTER");
    handleSubmit();
  };
  const eventMap = {
    Tab: keyDownTab,
    Enter: keyDownEnter,
  };

  const KeydownEvent = (event) => {
    eventMap[event.key]?.(event);
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
      console.log(Email, Password);
      const body = {
        email: Email,
        password: Password,
      };
      dispatch(loginUser({ body }));
      CloseMenu();
      setDialog(false);
    } else {
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
        startIcon={<Login />}
      >
        로그인
      </Button>
      <Dialog open={DialogOpen} onKeyDown={KeydownEvent} onClose={handleDialog}>
        <DialogTitle className="modalTitle-Typo">
          로그인
          <Login fontSize="large" sx={{ pl: 1 }} />
        </DialogTitle>
        <Stack spacing={2} sx={{ px: 3, py: 2 }}>
          <TextField
            autoFocus
            id="email"
            label="아이디 / 이메일"
            error={Validate}
            helperText={!Validate ? "" : "올바른 이메일을 입력해주세요"}
            placeholder="DUMMY@gmail.com"
            variant="outlined"
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            id="password"
            label="비밀번호"
            type="password"
            placeholder="DUMMY@gmail.com"
            variant="outlined"
            onChange={(event) => setPassword(event.target.value)}
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

export default LoginModule;
