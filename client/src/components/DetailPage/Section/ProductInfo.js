import { Grid, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const tagDetail = {
  tires: ["Width - Profile - Size", "Brand", "Condition"],
  wheels: ["Size", "Region", "Design"],
};
const spacingTop = 6;

const ProductInfo = (prop) => {
  // let { type, item } = useParams();
  let { item } = useParams();
  let renderData = [];
  if (item === "tires") {
    renderData = renderData.concat([
      `${prop.width} - ${prop.profile} - ${prop.size}`,
      `${prop.brand ? prop.brand : "Brand 정보 없음"}`,
      `${prop.condition ? `++${prop.condition}%` : "Condition 정보 없음"}`,
    ]);
  } else if (item === "wheels") {
  } else {
    renderData = ["REQUEST", "REQUEST", "REQUEST"];
  }
  return (
    <Grid item xs={5.5} container alignItems="center" direction={"row"}>
      {/* INFO - TAG */}
      <Grid item xs={4.5}>
        <Stack spacing={spacingTop} minWidth={150}>
          <Typography
            variant="h5"
            sx={{ color: "primary.main", fontWeight: "bold" }}
          >
            Product Info
          </Typography>
          {tagDetail[item].map((item, index) => (
            <Typography key={index}>{item}</Typography>
          ))}
        </Stack>
      </Grid>
      <Grid item xs={5}>
        <Stack spacing={spacingTop}>
          <Typography variant="caption" sx={{ fontWeight: "bold", pt: 1.5 }}>
            제품정보
          </Typography>
          {tagDetail[item].map((item, index) => (
            <Typography key={index}>{renderData[index]}</Typography>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ProductInfo;
