import {
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import * as React from "react";
import ItemOption from "../../modules/ItemOption";

function OptionForWheel() {
  const [region, setRegion] = React.useState("ALL");
  const [design, setDesign] = React.useState("ALL");

  const regionChange = (event, newRegion) => {
    setRegion(newRegion !== null ? newRegion : region);
  };
  const designChange = (event, newDesign) => {
    setDesign(newDesign !== null ? newDesign : design);
  };
  return (
    <Stack>
      <Grid container direction="row" flexWrap="nowrap">
        <Grid item container direction="column" spacing={2}>
          <Grid item>
            <Typography>REGION</Typography>
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={region}
              onChange={regionChange}
            >
              <ToggleButton value="ALL">ALL</ToggleButton>
              <ToggleButton value="국산">국산</ToggleButton>
              <ToggleButton value="수입">수입</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item>
            <Typography>REGION</Typography>
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={design}
              onChange={designChange}
            >
              <ToggleButton value="ALL">ALL</ToggleButton>
              <ToggleButton value="normal">일반</ToggleButton>
              <ToggleButton value="cutting">커팅</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        <Grid item sx={{ display: { xs: "none", md: "flex" } }}>
          <ItemOption />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default OptionForWheel;
