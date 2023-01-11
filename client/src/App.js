import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import NavBar from "./components/NavBar/NavBar";
import ItemPage from "./components/ItemPage/ItemPage";
import { Grid, Box, Stack } from "@mui/material";
import SideBar from "./components/SideBar/SideBar";
import ServicePage from "./components/ServicePage/ServicePage";
import FAQPage from "./components/FAQPage/FAQPage";
import ItemDetailPage from "./components/DetailPage/ItemDetailPage";
import PostPage from "./components/PostPage/PostPage";

const appWidth = 1600;

function App() {
  const BODY_SX = { width: "80vw", minWidth: "1000px", maxWidth: "1600px" };
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
          sx={{ maxWidth: `${appWidth}`, flexWrap: "nowrap" }}
        >
          <Grid item>
            <SideBar />
          </Grid>
          <Grid item className="mainContents" sx={BODY_SX}>
            <Routes>
              <Route path="/" element={<LandingPage reset={false} />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/service" element={<ServicePage />} />

              <Route path="/tires/:type" element={<ItemPage item="tires" />} />
              <Route
                path="/wheels/:type"
                element={<ItemPage item="wheels" />}
              />
              <Route
                path="/:item/:type/:id"
                element={<ItemDetailPage type="item" />}
              />
              <Route path="/requests" element={<FAQPage />} />
              <Route
                path="/requests/:id"
                element={<ItemDetailPage type="request" />}
              />
              <Route path="/posts/:item/" element={<PostPage />} />
              <Route
                path="/posts/:item/:id"
                element={<PostPage adjust={true} />}
              />

              {/* 잘못된 접근 시 reset 을 통해서 redux 상태 초기화여부 */}
              <Route path="*" element={<LandingPage reset={true} />} />
            </Routes>
          </Grid>
        </Grid>
      </Stack>
    </Router>
  );
}

export default App;
