import {
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import * as React from "react";
import ItemOption from "./ItemOption";
import itemOptionTable from "../../modules/itemOptionTable";

function OptionForWheel(props) {
  const setStateFunction = props.getState;
  const OptionValue = props.prop;
  const region = OptionValue[0];
  const [design, setDesign] = React.useState("전체");
  const regionChange = (event, newRegion) => {
    setStateFunction(0, newRegion);
  };
  const designChange = (event, newDesign) => {
    setStateFunction(1, newDesign);
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
              value={OptionValue[0]}
              onChange={regionChange}
              fullWidth
            >
              <ToggleButton value="전체">ALL</ToggleButton>
              <ToggleButton value="국산">국산</ToggleButton>
              <ToggleButton value="수입">수입</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item>
            <Typography>REGION</Typography>
            <ToggleButtonGroup
              color="primary"
              exclusive
              key={1}
              value={OptionValue[1]}
              onChange={designChange}
              fullWidth
            >
              <ToggleButton value="전체">ALL</ToggleButton>
              <ToggleButton value="일반">일반</ToggleButton>
              <ToggleButton value="커팅">커팅</ToggleButton>
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
            getState={setStateFunction}
            index={2}
            prop={{
              title: "인치",
              option: itemOptionTable.wheel.size.detail,
              value: OptionValue[2],
            }}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default OptionForWheel;
