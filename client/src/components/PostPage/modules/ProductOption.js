import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";

const mapping = {
  type: ["TIRE", "WHEEL"],
  tire: {
    GC: 5,
    size: ["", ...Array.from({ length: 10 }, (_, i) => i + 13)],
    width: Array.from({ length: 22 }, (_, i) => i * 5 + 200),
    profile: Array.from({ length: 10 }, (_, i) => i * 5 + 30),
    brand: ["금호", "한국", "미쉐린", "컨티넨탈", "피렐리"],
  },
  wheel: {
    size: Array.from({ length: 10 }, (_, i) => i + 13),
    region: ["국산", "수입"],
    design: ["일반", "커팅"],
  },
};

const MUIselect = (props) => {};
const testArr = ["19", "20", "21", "22", "23", "test"];
function ProductOption() {
  const [GroupCount, setGroupCount] = React.useState(5);
  const [Type, setType] = React.useState("TIRE");
  const [Props, setProps] = React.useState(["", "", "", ""]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setType(event.target.value);
  };
  const handleProps = (event, index) => {
    console.log(event, index, testArr.includes(event));
    console.log(testArr.includes(20));
    let newProps = [...Props];
    newProps[index] = event;
    setProps([...newProps]);
  };
  return (
    <Grid item xs="auto" sx={{ height: "200px", py: 2 }}>
      <Paper elevation={24} sx={{ height: "100%", width: "100%" }}>
        <Stack direction="row">
          <Box>
            <RadioGroup value={Type} onChange={handleChange}>
              <FormControlLabel
                value="TIRE"
                control={<Radio />}
                label="타이어"
              />
              <FormControlLabel value="WHEEL" control={<Radio />} label="휠" />
            </RadioGroup>
          </Box>
          <Stack sx={{}}>
            <Select
              value={testArr.includes(Props[0]) ? Props[0] : "NONE"}
              label="SIZE"
              onChange={(event) => handleProps(event.target.value, 0)}
            >
              <MenuItem value={"NONE"}>NONE</MenuItem>
              <MenuItem value={"19"}>19</MenuItem>
              <MenuItem value={"20"}>20</MenuItem>
              <MenuItem value={"21"}>21</MenuItem>
              <MenuItem value={"22"}>22</MenuItem>
              <MenuItem value={"23"}>23</MenuItem>
              <MenuItem value={"test"}>TEST</MenuItem>
            </Select>
            <TextField
              onChange={(event) => handleProps(event.target.value, 0)}
              value={Props[0]}
              placeholder="19"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ mb: 0.1 }}>
                    R
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  );
}

export default ProductOption;
