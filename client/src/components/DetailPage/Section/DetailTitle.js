import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import * as Axios from "axios";

const ItemDetailTitle = (props) => {
  const itemID = useParams().id;
  const item = props.item;
  const navigate = useNavigate();
  async function handleRemove() {
    await Axios.delete(`/api/${props.item}/${itemID}`).then((response) => {
      if (response.status === 200)
        return navigate(
          `/${props.item}/${props.item === "request" ? "" : "new"}`
        );
      return alert("삭제에 실패했습니다. 관리자에게 문의해주세요!");
    });
  }

  const ControlerRender = () => {
    if (props.ControlFlag)
      return (
        <Box>
          <Button onClick={handleRemove}>REMOVE</Button>
          <Button onClick={() => navigate(`/posts/${item}/${itemID}`)}>
            ADJ
          </Button>
        </Box>
      );
    return <Box></Box>;
  };
  return (
    <Stack direction="row" justifyContent="space-between">
      <Box>
        <Typography color="primary.main" variant="h5" fontWeight="bold">
          {props.title}
        </Typography>
      </Box>
      <ControlerRender />
    </Stack>
  );
};

export default ItemDetailTitle;
