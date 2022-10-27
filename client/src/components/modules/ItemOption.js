import { Box, Tab, Tabs, Typography } from "@mui/material";
import * as React from "react";
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
function ItemOption() {
  const [value, setValue] = React.useState(0);

  const props = {
    title: "Tire Width",
    option: [145, 150, 155, 160, 165, 170, 175, 180, 185],
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      maxWidth="100%"
      sx={{ display: "flex", flexDirection: "column", height: "200px" }}
    >
      <Typography>{props.title} &gt;</Typography>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: "divider" }}
        visibleScrollbar
        scrollButtons={false}
      >
        {props &&
          props.option.map((item, index) => (
            <Tab
              label={item}
              key={item + index}
              {...a11yProps(index)}
              sx={{ color: "white" }}
            />
          ))}
        {/* <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} /> */}
      </Tabs>
    </Box>
  );
}

export default ItemOption;
