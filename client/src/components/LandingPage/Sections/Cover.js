import { Grid } from "@mui/material";
import * as React from "react";
import CoverImage from "../../modules/CoverImage";
import CoverLeft from "./CoverLeft";
import CoverRight from "./CoverRight";

const coverPosition = [7, 5];
function Cover({ position }) {
  const [searchToggle, setSearchToggle] = React.useState("tires");

  return (
    <Grid item container xs={position}>
      <Grid item container justifyContent="center" alignItems="center">
        <CoverImage />
        <CoverLeft coverPosition={coverPosition} />
        <CoverRight
          props={[searchToggle, setSearchToggle]}
          coverPosition={coverPosition}
        />
      </Grid>
    </Grid>
  );
}
export default Cover;
