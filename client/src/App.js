import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import NavBar from "./components/NavBar/NavBar";
import TirePage from "./components/ItemPage/TirePage";
import { Grid } from "@mui/material";
import SideBar from "./components/SideBar/SideBar";

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
            <Route exact path="/items" element={<TirePage />} />
          </Routes>
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
