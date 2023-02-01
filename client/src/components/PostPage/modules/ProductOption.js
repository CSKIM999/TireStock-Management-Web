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
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";

const FullWH = { width: "100%", height: "100%" };

const mapping = {
  type: ["TIRE", "WHEEL"],
  TIRES: {
    size: ["NONE", ...Array.from({ length: 10 }, (_, i) => `${i + 13}`)],
    width: ["NONE", ...Array.from({ length: 22 }, (_, i) => `${i * 5 + 200}`)],
    profile: ["NONE", ...Array.from({ length: 10 }, (_, i) => `${i * 5 + 30}`)],
    condition: [
      "NONE",
      ...Array.from({ length: 10 }, (_, i) => `${100 - i * 10}`),
    ],
    brand: ["NONE", "금호", "한국", "미쉐린", "컨티넨탈", "피렐리"],
  },
  WHEELS: {
    size: ["NONE", ...Array.from({ length: 10 }, (_, i) => `${i + 13}`)],
    region: ["NONE", "국산", "수입"],
    design: ["NONE", "일반", "커팅"],
  },
};
function ProductOption({ PO_item, PO_type, PO_props }) {
  // TODO ... 만약 mapping 값에 없는 값이 입력되고, submit 되는 경우 입력된 값이 새로 추가하려는게 맞는지
  // 확인절차 추가 필요.

  const Item = PO_item.toUpperCase();
  const [Type, setType] = PO_type;
  const [Props, setProps] = PO_props;

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleProps = (event, index) => {
    let newProps = [...Props];
    newProps[index] = event === "NONE" ? "" : event;
    setProps([...newProps]);
  };

  const selectBox = (props) => {
    const keys = Object.keys(mapping[props]);
    const values = Object.values(mapping[props]);
    return (
      <Stack
        direction="row"
        sx={{ justifyContent: "space-around", alignItems: "center", ...FullWH }}
      >
        {keys.map((item, index) => {
          // eslint-disable-next-line array-callback-return
          if (item === "condition" && Type !== "USED") return;
          return (
            <Stack
              className="postingOption"
              key={item + index}
              spacing={2}
              sx={{ maxWidth: "150px" }}
            >
              <Typography variant="caption">{item.toUpperCase()}</Typography>
              <Select
                value={
                  values[index].includes(Props[index]) ? Props[index] : "NONE"
                }
                // label={item} << label 을 넣으면 focus 시 border top 쪽에 lable 이 나타나서 border-line 이
                // 지워지는 현상 발생 => 굳이 label 로 넣지 말고 Typography 로 넣어주자.
                onChange={(event) => handleProps(event.target.value, index)}
                MenuProps={{ style: { maxHeight: "300px" } }}
              >
                {values[index].map((v_item, v_index) => (
                  <MenuItem value={v_item} key={v_item + v_index}>
                    {v_item}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                onChange={(event) => handleProps(event.target.value, index)}
                value={Props[index]}
                placeholder={values[index][1]}
                InputProps={
                  item === "size"
                    ? {
                        startAdornment: (
                          <InputAdornment position="start" sx={{ mb: 0.1 }}>
                            R
                          </InputAdornment>
                        ),
                      }
                    : {}
                }
              />
            </Stack>
          );
        })}
      </Stack>
    );
  };
  return (
    <Grid item xs="auto" sx={{ height: "250px", py: 2 }}>
      <Paper sx={{ ...FullWH }}>
        <Grid container sx={FullWH}>
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {/* <Box>
              <RadioGroup value={Item} onChange={handleItemChange}>
                <FormControlLabel
                  value="TIRE"
                  control={<Radio />}
                  label="타이어"
                />
                <FormControlLabel
                  value="WHEEL"
                  control={<Radio />}
                  label="휠"
                />
              </RadioGroup>
            </Box> */}
            <Box>
              <RadioGroup value={Type} onChange={handleTypeChange}>
                <FormControlLabel
                  value="NEW"
                  control={<Radio />}
                  label="신품"
                />
                <FormControlLabel
                  value="USED"
                  control={<Radio />}
                  label="중고"
                />
              </RadioGroup>
            </Box>
          </Grid>
          <Grid
            item
            xs={10}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {selectBox(Item)}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default ProductOption;
