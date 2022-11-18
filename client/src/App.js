import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import NavBar from "./components/NavBar/NavBar";
import ItemPage from "./components/ItemPage/ItemPage";
import { Grid, Box, Stack } from "@mui/material";
import SideBar from "./components/SideBar/SideBar";
import ServicePage from "./components/ServicePage/ServicePage";
import DetailPage from "./components/DetailPage/DetailPage";

function App() {
  return (
    // github-page 에서 deploy 할 경우 browserRouter 은 작동하지 않을 수 있음.
    // BrouserRouter => HashRouter 로 대체가능.

    <Router>
      <Stack height="100vh">
        <NavBar />
        <Grid container height="100%">
          <Grid item xs={1}>
            <SideBar />
          </Grid>
          <Grid item xs={11}>
            <Routes>
              <Route exact path="/" element={<LandingPage reset={false} />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/service" element={<ServicePage />} />
              <Route
                exact
                path="/tires/new"
                element={<ItemPage item="tires" type="new" />}
              />
              <Route
                exact
                path="/tires/used"
                element={<ItemPage item="tires" type="used" />}
              />
              <Route
                exact
                path="/wheels/new"
                element={<ItemPage item="wheels" type="new" />}
              />
              <Route
                exact
                path="/wheels/used"
                element={<ItemPage item="wheels" type="used" />}
              />
              <Route exact path="/detail" element={<DetailPage />} />
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
