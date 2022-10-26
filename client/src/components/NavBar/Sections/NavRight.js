import * as React from "react";
import { Button, Stack } from "@mui/material";
import LoginButton from "./LoginButton";

const pages = ["HOME", "타이어", "휠", "복원 및 문의"];
function NavRight(props) {
  return (
    <Stack direction="row" alignItems="center" spacing={5} sx={{ pr: 3 }}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={5}
        sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
      >
        {pages.map((page) => (
          <Button
            key={page}
            sx={{
              my: 2,
              px: 3,
              py: 1,
              // background: "black",
              bgcolor: "background.paper",
              display: "block",
            }}
          >
            {page}
          </Button>
        ))}
      </Stack>
      <LoginButton />
    </Stack>
  );
}

export default NavRight;
