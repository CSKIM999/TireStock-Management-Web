import { Box, Tab, Tabs, Typography } from "@mui/material";
import * as React from "react";
function ItemOption() {
  const [value, setValue] = React.useState(0);
  const indicatorProp = {
    sx: {
      bgcolor: "white",
      width: "90%",
      borderRadius: "0.5rem",
      mx: 1,
    },
  };
  const props = {
    title: "Tire Width",
    option: [145, 150, 155, 160, 165, 170, 175, 180, 185],
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      width="100%"
      className="optionSet"
      sx={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <Typography sx={{ pl: 1, pb: 1 }}>{props.title} &gt;</Typography>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: "divider", height: "200px" }}
        visibleScrollbar
        scrollButtons={false}
        TabIndicatorProps={indicatorProp}
      >
        {props &&
          ["Default", ...props.option].map((item, index) => (
            <Tab label={item} key={index} sx={{ color: "white", zIndex: 1 }} />
          ))}
      </Tabs>
    </Box>
  );
}

export default ItemOption;
