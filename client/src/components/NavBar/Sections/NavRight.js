import * as React from "react";
import { Button, Stack } from "@mui/material";
import UserAccount from "./UserAccount";
import { useLocation } from "react-router-dom";

const pages = ["HOME", "타이어", "휠", "복원 및 문의"];
const pageURL = {
  HOME: "/",
  타이어: "/tires/new",
  휠: "/wheels/new",
  "복원 및 문의": "/requests",
};
const pageMap = {
  HOME: "",
  타이어: "tires",
  휠: "wheels",
  "복원 및 문의": "requests",
};
function NavRight() {
  const [nowPath, setNowPath] = React.useState(null);
  React.useEffect(() => {
    const [_, mainPath, detailPath] = window.location.pathname.split("/");
    if (mainPath) {
      setNowPath(mainPath);
    } else {
      setNowPath("");
    }
  }, [window.location.pathname]);
  return (
    <Stack direction="row" alignItems="center" spacing={5} sx={{ pr: 3 }}>
      <Stack
        justifyContent="flex-end"
        direction="row"
        alignItems="center"
        spacing={5}
        sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
      >
        {pages.map((page) => (
          <Button
            href={pageURL[page]}
            className={`nav-Button ${
              nowPath && nowPath === pageMap[page] ? "navSelected-Button" : ""
            }`}
            key={page}
            sx={{
              my: 2,
              px: 3,
              py: 1,
              display: "block",
            }}
          >
            {page}
          </Button>
        ))}
      </Stack>
      <UserAccount sx={{ color: "primary.main" }} />
    </Stack>
  );
}

export default NavRight;
