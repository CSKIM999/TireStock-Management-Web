import {
  Box,
  Dialog,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
const LoginButton = (D_open, CloseFunction) => {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    setOpen(D_open);
  }, [D_open]);

  console.log("check", open);
  const handleClose = () => {
    console("debbug check1");
    CloseFunction(false);
    debugger;
  };
  return (
    // <MenuItem onClick={handleClose} sx={{ display: { type } }}>
    //   <LoginButton sx={{ pr: 0.5 }} />
    //   <Typography>로그인</Typography>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>로그인</DialogTitle>
      <TextField
        autoFocus
        id="email"
        label="Email"
        placeholder="DUMMY@gmail.com"
        multiline
        variant="outlined"
      />
    </Dialog>
    // </MenuItem>
  );
};

export default LoginButton;
