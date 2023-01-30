import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Button, Grid, MobileStepper, Paper } from "@mui/material";
import React from "react";
import SwipeableViews from "react-swipeable-views";

const itemPaperSX = {
  width: "100%",
  height: "100%",
  bgcolor: "primary.main",
};

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: "#fff",
  },
  slide1: {
    background: "#FEA900",
  },
  slide2: {
    background: "#B3DC4A",
  },
  slide3: {
    background: "#6AC0FF",
  },
};
function ImageSlider({ images }) {
  const [activeStep, setActiveStep] = React.useState(0);
  console.log("🚀 ~ file: ImageSlider.js:28 ~ ImageSlider ~ images", images);
  const maxSteps = images.length;
  const handleStep = (bool) => {
    if (bool) return setActiveStep((prev) => prev + 1);
    return setActiveStep((prev) => prev - 1);
  };
  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  return (
    <Grid item xs={12} md={5.5} sx={{ pr: 2 }}>
      <Paper sx={itemPaperSX}>
        <SwipeableViews
          axis="x"
          index={activeStep}
          onChangeIndex={handleStepChange}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Box
            component="img"
            src="https://objectstorage.ap-seoul-1.oraclecloud.com/n/cnylck3cahga/b/bucket-20230124-0355/o/image-1675069699855.jpg"
          /> */}
          {images.map((image, index) => (
            <Box component="img" src={image} key={index} />
          ))}
        </SwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={() => handleStep(false)}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={() => handleStep(true)}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </Paper>
    </Grid>
  );
}

export default ImageSlider;
