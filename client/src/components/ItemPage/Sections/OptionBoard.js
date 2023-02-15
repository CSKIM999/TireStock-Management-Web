import { Grid, Paper } from "@mui/material";
import ItemOption from "./ItemOption";
import itemOptionTable from "../../modules/itemOptionTable";
import OptionForWheel from "./OptionForWheel";

const gridItemOptionSX = { display: { xs: "none", md: "flex" } };
const OptionBoard = (type, setStateFunction, OptionValue) => {
  if (type === "tires") {
    return (
      <Paper className="full Plevel2 br0" elevation={0} sx={{ py: 3 }}>
        <Grid container direction="row" justifyContent={"space-evenly"}>
          {Object.entries(itemOptionTable.tire).map((item, index) => {
            const data = item[1];
            return (
              <Grid key={index} item sx={gridItemOptionSX} md={1.7}>
                <ItemOption
                  getState={setStateFunction}
                  index={index}
                  prop={{
                    title: data.title,
                    option: data.detail,
                    value: OptionValue[index],
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    );
  } else if (type === "wheels")
    return <OptionForWheel getState={setStateFunction} prop={OptionValue} />;
};

export default OptionBoard;
