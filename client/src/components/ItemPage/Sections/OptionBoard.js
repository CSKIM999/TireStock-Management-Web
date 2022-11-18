import { Grid } from "@mui/material";
import ItemOption from "../../modules/ItemOption";
import itemOptionTable from "../util/itemOptionTable";
import OptionForWheel from "../util/OptionForWheel";

const gridItemOptionSX = { display: { xs: "none", md: "flex" } };
const OptionBoard = (type, setStateFunction) => {
  if (type === "tires") {
    return (
      <Grid container direction="row" justifyContent={"space-evenly"}>
        {Object.entries(itemOptionTable.tire).map((item, index) => {
          const data = item[1];
          return (
            <Grid key={index} item sx={gridItemOptionSX} md={1.7}>
              <ItemOption
                getState={setStateFunction}
                index={index}
                prop={{ title: data.title, option: data.detail }}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  } else if (type === "wheels")
    return <OptionForWheel getState={setStateFunction} />;
};

export default OptionBoard;
