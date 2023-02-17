import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import NavBar from "./components/NavBar/NavBar";
import ItemPage from "./components/ItemPage/ItemPage";
import { Box, Grid, Stack } from "@mui/material";
import SideBar from "./components/SideBar/SideBar";
import ServicePage from "./components/ServicePage/ServicePage";
import FAQPage from "./components/FAQPage/FAQPage";
import ItemDetailPage from "./components/DetailPage/ItemDetailPage";
import PostPage from "./components/PostPage/PostPage";
import Auth from "./hoc/auth";

function App() {
  const BODY_SX = { width: "80vw", minWidth: "1000px", maxWidth: "1600px" };
  // option : null/아무나 true/로그인한 자 false/로그인하지 않은 자
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthItemPage = Auth(ItemPage, null);
  const AuthItemDetailPage = Auth(ItemDetailPage, null);
  const AuthPostPage = Auth(PostPage, true);
  const AuthFAQPage = Auth(FAQPage, null);
  return (
    // github-page 에서 deploy 할 경우 browserRouter 은 작동하지 않을 수 있음.
    // BrouserRouter => HashRouter 로 대체가능.

    <Router>
      <Stack height="100vh" sx={{ alignItems: "center" }}>
        <NavBar SX={BODY_SX} />
        <Grid
          container
          height="100%"
          justifyContent="center"
          sx={{ maxWidth: "100rem", flexWrap: "nowrap" }}
        >
          <Grid item>
            <SideBar />
          </Grid>
          <Grid item className="mainContents" sx={BODY_SX}>
            <Routes>
              <Route path="/" element={<AuthLandingPage reset={false} />} />
              <Route
                path="/tires/:type"
                element={<AuthItemPage item="tires" />}
              />
              <Route
                path="/wheels/:type"
                element={<AuthItemPage item="wheels" />}
              />
              <Route
                path="/:item/:type/:id"
                element={<AuthItemDetailPage type="item" />}
              />
              <Route path="/requests" element={<AuthFAQPage />} />
              <Route
                path="/requests/:id"
                element={<AuthItemDetailPage type="request" />}
              />
              <Route path="/posts/:item/" element={<AuthPostPage />} />
              <Route
                path="/posts/:item/:id"
                element={<AuthPostPage adjust={true} />}
              />

              {/* 잘못된 접근 시 reset 을 통해서 redux 상태 초기화여부 */}
              <Route path="*" element={<AuthLandingPage reset={true} />} />
            </Routes>
          </Grid>
        </Grid>
      </Stack>
    </Router>
  );
}

export default App;
