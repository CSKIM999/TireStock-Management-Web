import { Grid, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const tagDetail = {
  tires: ["Width - Profile - Size", "Brand", "Condition"],
  wheels: ["Size", "Region", "Design"],
};
const spacingTop = 6;
const fontSX = { fontWeight: "bold" };
const ProductInfo = (prop) => {
  let { item } = useParams();
  let renderData = [];
  if (item === "tires") {
    renderData = renderData.concat([
      `${prop.width} - ${prop.profile} - ${prop.size}`,
      `${prop.brand ? prop.brand : "Brand 정보 없음"}`,
      `${prop.condition ? `++${prop.condition}%` : "Condition 정보 없음"}`,
    ]);
  } else if (item === "wheels") {
    renderData = renderData.concat([
      `${prop.size} 인치`,
      `${prop.region}휠`,
      `${prop.design}`,
    ]);
  } else {
    renderData = ["REQUEST", "REQUEST", "REQUEST"];
  }
  return (
    <Grid item xs={5.5} container alignItems="center" direction={"row"}>
      {/* INFO - TAG */}
      <Grid item xs={4.5}>
        <Stack spacing={spacingTop} minWidth={150}>
          <Typography className="detailTitle-Typo ls5">Product Info</Typography>
          {tagDetail[item].map((item, index) => (
            <Typography key={index}>{item}</Typography>
          ))}
        </Stack>
      </Grid>
      <Grid item xs={5}>
        <Stack spacing={spacingTop}>
          <Typography variant="caption" sx={{ ...fontSX, pt: 1.5 }}>
            제품정보
          </Typography>
          {tagDetail[item].map((item, index) => (
            <Typography sx={fontSX} key={index}>
              {renderData[index]}
            </Typography>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ProductInfo;
