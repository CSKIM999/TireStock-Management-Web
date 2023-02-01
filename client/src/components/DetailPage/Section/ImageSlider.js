import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Button, Grid, MobileStepper, Paper, Stack } from "@mui/material";
import React from "react";
import SwipeableViews from "react-swipeable-views";

function ImageSlider({ images }) {
  const [activeStep, setActiveStep] = React.useState(0);
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
      {maxSteps > 0 && (
        <Stack
          sx={{ width: "100%", height: "100%", justifyContent: "center" }}
          spacing={2}
        >
          <Paper elevation={12}>
            <SwipeableViews
              axis="x"
              index={activeStep}
              onChangeIndex={handleStepChange}
              slideStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {images.map((image, index) => (
                <Box component="img" src={image} key={index} sx={{ p: 3 }} />
              ))}
            </SwipeableViews>
          </Paper>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="large"
                onClick={() => handleStep(true)}
                disabled={activeStep === maxSteps - 1}
                sx={{ mr: 5 }}
              >
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                size="large"
                onClick={() => handleStep(false)}
                disabled={activeStep === 0}
                sx={{ ml: 5 }}
              >
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
        </Stack>
      )}
      {maxSteps === 0 && (
        <Paper
          sx={{ width: "100%", height: "100%", bgcolor: "primary.main" }}
        />
      )}
    </Grid>
  );
}

export default ImageSlider;
