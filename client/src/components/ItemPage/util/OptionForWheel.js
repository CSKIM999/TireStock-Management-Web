import {
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import * as React from "react";
import ItemOption from "../../modules/ItemOption";
import itemOptionTable from "./itemOptionTable";

function OptionForWheel(props) {
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
      <Grid
        container
        direction="row"
        flexWrap="nowrap"
        justifyContent={"center"}
      >
        <Grid
          item
          container
          direction="column"
          spacing={2}
          md={5}
          sx={{ mr: 10 }}
        >
          <Grid item>
            <Typography>REGION</Typography>
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={region}
              onChange={regionChange}
              fullWidth
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
              fullWidth
            >
              <ToggleButton value="ALL">ALL</ToggleButton>
              <ToggleButton value="normal">일반</ToggleButton>
              <ToggleButton value="cutting">커팅</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        <Grid
          item
          sx={{ display: { xs: "none", md: "flex" } }}
          justifyContent={"space-evenly"}
          md={2}
        >
          <ItemOption
            prop={{ title: "인치", option: { ...itemOptionTable.wheel.인치 } }}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default OptionForWheel;
