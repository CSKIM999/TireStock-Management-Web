import { GroupAdd, Pending } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as Axios from "axios";
import isEmail from "validator/lib/isEmail";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../store/userSlice";
import MuiAlert from "@mui/material/Alert";
const RegistModule = (CloseMenu) => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [DialogOpen, setDialog] = React.useState(false);
  const [emailValidate, setEmailValidate] = React.useState(false);
  const [nickameValidate, setNicknameValidate] = React.useState(true);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    content: "",
  });
  const [snackbarContent, setSnackbarContent] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [Compare, setCompare] = React.useState("");
  const [NickName, setNickName] = React.useState("");
  const [Loading, setLoading] = React.useState(undefined);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // TODO
  // pending => loading 창 돌아가게
  // reject => 리덕스에서 state.data 로 중복부분 추출 후 스낵바
  // fulfilled => 회원가입 성공 (red-dot 부분 참고해서 다시구현)
  React.useEffect(() => {
    const rejectMap = {
      email: "이메일",
      nickname: "닉네임",
    };
    // console.log(user.state?.type);
    switch (user.state?.type) {
      case undefined:
        console.log("undifined");
        return;
      case "pending":
        console.log("pending");
        return;
      case "rejected":
        console.log("rejected", user);
        setSnackbar({
          ...snackbar,
          open: true,
          content: rejectMap[user.state.data],
        });
        return;
      case "fulfilled":
        console.log("fulfilled");
        return;
      default:
        return;
    }
    // if (NickName === 0) {
    // }
  }, [Loading]);
  const typeSwitch = (target) => {
    const [opt1, opt2, str1, str2, empty] = Object.values(target);
    return opt1 ? str1 : opt2 ? str2 : str1;
  };
  const stateReset = () => {
    setEmail("");
    setPassword("");
    setCompare("");
    setNickName("");
  };
  const dict = {
    Email: {
      case1: emailValidate,
      case2: true,
      alert1: "",
      alert2: "올바른 이메일을 입력해주세요",
      empty: Email.length === 0,
    },
    Password: {
      case1: Password.length !== 0 && Password.length < 4,
      case2: Password.length > 12,
      alert1: "4~12글자 사이로 설정해주세요",
      alert2: "비밀번호 최대길이는 12글자 입니다.",
      empty: Password.length === 0,
    },
    Compare: {
      case1: Compare !== Password,
      case2: Compare.length > 3 && Compare.length < 12,
      alert1: "비밀번호를 확인해주세요",
      alert2: "",
      empty: Compare.length === 0,
    },
    NickName: {
      case1: NickName.length !== 0 && NickName.length < 2,
      case2: NickName.length > 10,
      alert1: "2~10 글자의 닉네임을 작성해주세요",
      alert2: "닉네임의 최대길이는 10글자입니다",
      empty: NickName.length === 0,
    },
  };

  const colorClassMap = {
    Email: emailValidate ? "success" : "",
    Password:
      !dict.Password.empty && !dict.Password.case1 && !dict.Password.case2
        ? "success"
        : "",
    Compare:
      !dict.Compare.empty && !dict.Compare.case1 && dict.Compare.case2
        ? "success"
        : "",
    NickName:
      nickameValidate &&
      !dict.NickName.empty &&
      !dict.NickName.case1 &&
      !dict.NickName.case2
        ? "success"
        : "",
  };

  const stopPropagationForTab = (event) => {
    if (event.key === "Tab") {
      event.stopPropagation();
    }
  };
  const IsValid = (str) => {
    if (isEmail(str)) {
      setEmailValidate(true);
    } else {
      setEmailValidate(false);
    }
  };

  const handleSubmit = async () => {
    IsValid(Email);
    if (isEmail(Email)) {
      if (Password !== Compare) {
        return alert("비밀번호가 일치하지 않습니다");
      }
      const body = {
        email: Email,
        password: Password,
        nickname: NickName,
      };
      // dispatch(registerUser({ body }));

      setLoading("pending");
      const request = await Axios.post("/api/users/register", body, {
        withCredentials: true,
      });
      if (request.success) return setLoading("fulfilled");
      return console.log(request);

      // .then(testFunc());
      // if (!user.loading) {
      //   console.log('not Loading')
      //   CloseMenu();
      //   setDialog(false);
      //   stateReset();
      // } else {
      // }
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
      <Dialog
        open={DialogOpen}
        onKeyDown={stopPropagationForTab}
        onClose={handleDialog}
      >
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          sx={{ mb: 10 }}
        >
          <Alert severity="error">
            이미 사용중인 {snackbar.content} 입니다!
          </Alert>
        </Snackbar>
        <DialogTitle>회원가입</DialogTitle>
        <Stack spacing={2} sx={{ px: 3, py: 2 }}>
          <TextField
            autoFocus
            id="email"
            label="아이디 / 이메일"
            type="email"
            value={Email}
            error={!emailValidate && !dict.Email.empty}
            helperText={typeSwitch(dict.Email)}
            color={colorClassMap.Email}
            className={colorClassMap.Email}
            placeholder="DUMMY@gmail.com"
            variant="outlined"
            onChange={(event) => {
              setEmailValidate(isEmail(event.target.value));
              setEmail(event.target.value);
            }}
          />
          <TextField
            id="password"
            label="비밀번호"
            placeholder="abcd1234"
            type="password"
            error={dict.Password.case1 || dict.Password.case2}
            helperText={typeSwitch(dict.Password)}
            className={colorClassMap.Password}
            color={colorClassMap.Password}
            variant="outlined"
            onChange={(event) => setPassword(event.target.value)}
          />
          <TextField
            id="comparePassword"
            label="비밀번호 확인"
            placeholder="abcd1234"
            type="password"
            error={
              (dict.Compare.case1 || !dict.Compare.case2) && Password.length > 3
            }
            helperText={typeSwitch(dict.Compare)}
            className={colorClassMap.Compare}
            color={colorClassMap.Compare}
            variant="outlined"
            onChange={(event) => setCompare(event.target.value)}
          />
          <TextField
            id="nickname"
            label="닉네임"
            type="text"
            placeholder="CHARLES"
            error={dict.NickName.case1 || dict.NickName.case2}
            color={colorClassMap.NickName}
            className={colorClassMap.NickName}
            helperText={typeSwitch(dict.NickName)}
            variant="outlined"
            onChange={(event) => setNickName(event.target.value)}
          />
          <Stack direction="row-reverse">
            <Button onClick={handleSubmit}>확인</Button>
            <Button onClick={handleDialog}>취소</Button>
          </Stack>
        </Stack>
      </Dialog>
    </Box>
  );
};

export default RegistModule;
