import { Box, Tab, Tabs, Typography } from "@mui/material";
import * as React from "react";
import { useSearchParams } from "react-router-dom";
function ItemOption(props) {
  console.log("🚀 ~ file: ItemOption.js:5 ~ ItemOption ~ props", props);
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = React.useState(0);
  const indicatorProp = {
    sx: {
      bgcolor: "white",
      width: "90%",
      borderRadius: "0.5rem",
      mx: 1,
    },
  };
  const prop = props.prop;
  let options = [];
  if (Array.isArray(prop.option)) {
    options = [...prop.option];
  } else {
    for (
      let i = prop.option.start;
      i <= prop.option.end;
      i += prop.option.step
    ) {
      options.push(i);
    }
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (props.getState) {
      props.getState(props.index, event.target.id);
    }
  };
  React.useEffect(() => {
    const size = searchParams.get("size");
    const profile = searchParams.get("profile");
    const width = searchParams.get("width");
    const region = searchParams.get("region");
    const design = searchParams.get("design");
    if (size ?? profile ?? width ?? region ?? design ?? false) {
      if (props.item === "tires") {
      }
    }
  }, []);
  return (
    <Box
      width="100%"
      className="optionSet"
      sx={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <Typography sx={{ pl: 1, pb: 1 }}>{prop.title} &gt;</Typography>
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
