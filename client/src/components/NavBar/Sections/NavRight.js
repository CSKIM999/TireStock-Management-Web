import * as React from "react";
import { Button, Stack } from "@mui/material";
import LoginButton from "./LoginButton";

const pages = ["HOME", "타이어", "휠", "복원 및 문의"];
const pageURL = {
  HOME: "/",
  타이어: "/tires/new",
  휠: "/wheels/new",
};
const pageMap = {
  HOME: "",
  타이어: "tires",
  휠: "wheels",
};
function NavRight(props) {
  const nowPath = window.location.pathname.split("/")[1];
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
            href={pageURL[page]}
            key={page}
            sx={{
              my: 2,
              px: 3,
              py: 1,
              // background: "black",
              bgcolor:
                nowPath === pageMap[page]
                  ? "background.info"
                  : "background.paper",
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