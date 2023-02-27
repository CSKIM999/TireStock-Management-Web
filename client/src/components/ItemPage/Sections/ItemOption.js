import { Box, Tab, Tabs, Typography } from "@mui/material";
import * as React from "react";
import GuidePopover from "../../PostPage/modules/GuidePopover";
const guide = ["단면폭", "편평비", "인치"];
const guideImage = {
  단면폭: process.env.REACT_APP_GUIDE_WIDTH,
  편평비: process.env.REACT_APP_GUIDE_PROFILE,
  인치: process.env.REACT_APP_GUIDE_SIZE,
};
function ItemOption(props) {
  const indicatorProp = {
    sx: {
      bgcolor: "text.secondary",
      width: "90%",
      borderRadius: "0.5rem",
      mx: 1,
    },
  };
  const prop = props.prop;
  let options = [];
  if (Array.isArray(prop.option)) {
    options = [...prop.option];
  }
  const value = prop.value === "전체" ? 0 : prop.value;
  const handleChange = (event, newValue) => {
    if (props.getState) {
      props.getState(props.index, newValue);
    }
  };
  return (
    <Box className="full" sx={{ display: "flex", flexDirection: "column" }}>
      <Typography className="fwb aic" sx={{ pl: 1, pb: 1 }}>
        {prop.title}{" "}
        {guide.includes(prop.title) && (
          <GuidePopover imageURL={guideImage[prop.title]} />
        )}
      </Typography>
      <Tabs
        className="optionSet-root"
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
          ["전체", ...options].map((item, index) => (
            <Tab
              label={
                prop.title === "컨디션" && index >= 1
                  ? `++${item}%`
                  : prop.title === "인치" && index >= 1
                  ? `R${item}`
                  : item
              }
              key={index}
              id={item}
              sx={{ color: "white", zIndex: 1 }}
            />
          ))}
      </Tabs>
    </Box>
  );
}

export default ItemOption;
