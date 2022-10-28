import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import NavBar from "./components/NavBar/NavBar";
import ItemPage from "./components/ItemPage/ItemPage";
import { Grid } from "@mui/material";
import SideBar from "./components/SideBar/SideBar";
import ServicePage from "./components/ServicePage/ServicePage";

function App() {
  return (
    // github-page 에서 deploy 할 경우 browserRouter 은 작동하지 않을 수 있음.
    // BrouserRouter => HashRouter 로 대체가능.
    <Router>
      <NavBar />
      <Grid container>
        <Grid item xs={1}>
          <SideBar />
        </Grid>
        <Grid item xs={11}>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/service" element={<ServicePage />} />
            <Route
              exact
              path="/tire/new"
              element={<ItemPage item="tire" type="NEW" />}
            />
            <Route
              exact
              path="/tire/used"
              element={<ItemPage item="tire" type="USED" />}
            />
            <Route
              exact
              path="/wheel/new"
              element={<ItemPage item="wheel" type="NEW" />}
            />
            <Route
              exact
              path="/wheel/used"
              element={<ItemPage item="wheel" type="USED" />}
            />
          </Routes>
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
