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
  console.log("🚀 ~ file: DetailTitle.js:21 ~ ItemDetailTitle ~ item:", props);

  const isAdmin = useSelector((state) => state.user.isAdmin);
  const navigate = useNavigate();
  const confirmation = (e) => {
    let confirmText;
    switch (e.currentTarget.textContent) {
      case "REMOVE":
        confirmText = "게시물을 삭제하시겠습니까?";
        break;
      case "ADJ":
        confirmText = "게시물을 수정하시겠습니까?";
        break;
      default:
        confirmText = "상태를 변경하시겠습니까?";
        break;
    }
    return window.confirm(confirmText);
  };
  const handleState = (e) => {
    if (!confirmation(e)) return;
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
      if (response.status === 200) {
        navigate(`/${props.item}/${props.item === "requests" ? "" : "new"}`);
        return;
      }
      return alert("삭제에 실패했습니다. 관리자에게 문의해주세요!");
    });
  }

  const ControlerRender = () => {
    if (props.ControlFlag)
      return (
        <>
          <Button
            variant="outlined"
            sx={{ mr: 1 }}
            onClick={(e) => (confirmation(e) ? handleRemove() : "")}
          >
            REMOVE
          </Button>
          <Button
            variant="outlined"
            onClick={(e) =>
              confirmation(e) ? navigate(`/posts/${item}/${itemID}`) : ""
            }
          >
            ADJ
          </Button>
        </>
      );
    return <></>;
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
    <Box className="jcsb aic pb2">
      <Box className="aife full">
        <Typography className="detailTitle-Typo">{props.title}</Typography>
        <Typography className="detailNickname-Typo px3" variant="subtitle1">
          {props.data.writerRole ? "관리자" : `작성자 : ${props.data.nickname}`}
        </Typography>
      </Box>
      <Box className="aife">
        {isAdmin && (
          <FormControl className="aic" sx={{ width: "16rem" }}>
            <RadioGroup row value={state} onChange={handleState}>
              <RadioGroupRender />
            </RadioGroup>
          </FormControl>
        )}
        <ControlerRender />
      </Box>
    </Box>
  );
};

export default ItemDetailTitle;
