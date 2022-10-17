import * as React from "react";
import { Box, Switch, TextField, Typography } from "@mui/material";

function LoginPage() {
  const [checked, setChecked] = React.useState(true);

  const mobileSwitch = (event) => {
    // Switch for check mobile version
    setChecked(event.target.checked);
    console.log(checked);
  };

  const textLables = {
    id: checked ? "아이디를 입력해주세요" : "아이디",
    pw: checked ? "비밀번호를 입력해주세요" : "비밀번호",
  };
  return (
    <Box>
      <Typography>LoginPage</Typography>
      <Switch checked={checked} onChange={mobileSwitch} />
      <TextField id="userId" required label={textLables.id} />
      <TextField id="userPW" required label={textLables.pw} />
    </Box>
  );
}

export default LoginPage;
