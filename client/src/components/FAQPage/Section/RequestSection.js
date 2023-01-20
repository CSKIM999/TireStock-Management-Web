import React from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import FAQItem from "../util/FAQItem";
import { useNavigate } from "react-router-dom";

function RequestSection(props) {
  console.log("🚀 ~ file: RequestSection.js:7 ~ RequestSection ~ props", props);
  const navigate = useNavigate();
  return (
    <Stack>
      {props.tab !== 2 && (
        <Box
          sx={{
            display: "flex",
            borderBottom: "2px solid white",
            flexDirection: "row-reverse",
            py: 2,
          }}
        >
          <Button onClick={() => navigate("/posts/requests")}>문의하기</Button>
        </Box>
      )}
      {/* 1page = 10개 */}
      <Paper elevation={0}>
        {props.RenderData &&
          props.RenderData.map((item, index) => (
            <React.Fragment key={index}>
              {FAQItem(item.state, item.title, item.createdAt, item._id)}
            </React.Fragment>
          ))}
        {!props.RenderData &&
          (() => <Typography>아직 문의사항이 없습니다</Typography>)}
      </Paper>
    </Stack>
  );
}

export default RequestSection;
