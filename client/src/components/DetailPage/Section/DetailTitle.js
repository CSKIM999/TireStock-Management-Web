import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import * as Axios from "axios";
import { useSelector } from "react-redux";

const ItemDetailTitle = (props) => {
  const [state, setState] = React.useState(props.state ?? "fulfilled");
  const itemID = useParams().id;
  const item = props.item;

  const isAdmin = useSelector((state) => state.user.isAdmin);
  const navigate = useNavigate();
  const handleState = (e) => {
    if (!window.confirm("상태를 변경하시겠습니까?")) return;
    // TODO >> axios.put REQUEST 로 현재 게시글 state 변경
    if (AxiosState(e.target.value)) {
      alert("정상적으로 변경되었습니다");
      return setState(e.target.value);
    }
    return alert("오류로 인해 상태가 변경되지 않았습니다");
  };
  async function AxiosState(value) {
    const body = {
      state: value,
    };
    await Axios.put(`/api/requests/state/${itemID}`, body).then((response) => {
      if (response.data.success) return true;
      return false;
    });
  }
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
        <>
          <Button onClick={handleRemove}>REMOVE</Button>
          <Button onClick={() => navigate(`/posts/${item}/${itemID}`)}>
            ADJ
          </Button>
        </>
      );
    return <Box></Box>;
  };

  const RadioGroupRender = () => {
    if (isAdmin && ["notice", "FAQ"].includes(props.state))
      return (
        <>
          <FormControlLabel
            value="notice"
            control={<Radio />}
            label="공지사항"
          />
          <FormControlLabel value="FAQ" control={<Radio />} label="FAQ" />
        </>
      );
    else
      return (
        <>
          <FormControlLabel
            value="fulfilled"
            control={<Radio />}
            label="대기"
          />
          <FormControlLabel value="pending" control={<Radio />} label="완료" />
          <FormControlLabel value="rejected" control={<Radio />} label="실패" />
        </>
      );
  };

  return (
    <Stack direction="row" justifyContent="space-between">
      <Box>
        <Typography className="detailTitle-Typo pb2">{props.title}</Typography>
      </Box>
      <Box>
        {isAdmin && (
          <FormControl>
            <RadioGroup row value={state} onChange={handleState}>
              <RadioGroupRender />
            </RadioGroup>
          </FormControl>
        )}
        <ControlerRender />
      </Box>
    </Stack>
  );
};

export default ItemDetailTitle;
