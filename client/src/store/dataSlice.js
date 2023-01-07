import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as Axios from "axios";

const initialState = {
  thumbNail: {
    path: "",
    items: [],
  },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    testData: (state, action) => {
      state.thumbNail.items.push("test");
    },
    pushThumbNail: (state, action) => {
      const { path, url } = action.payload;
      const statePath = state.thumbNail.path;
      const pushState = (url, path = null, overwrite = false) => {
        if (overwrite) {
          state.thumbNail.path = path;
          state.thumbNail.items = [url];
        } else {
          if (path) state.thumbNail.path = path;
          state.thumbNail.items.push(url);
        }
      };
      if (statePath === "") {
        // path 가 비어있을 때
        pushState(url, path);
      } else {
        // path 가 비어있지 않을때
        if (statePath !== path) {
          // 받아온 path 와 기존 path 가 다를 때 => 기존 데이터 덮어쓰고 경고창
          // TODO ... 현재 items 에 들어있는 url 들을 전부 revoke 해줄 것.

          pushState(url, path, true);
          return alert("[ ERROR ] 오류로 인해 기존 데이터가 덮어씌워집니다!");
        } else {
          // 받아온 path 가 기존 path 와 일치할 때 => 그냥 push
          pushState(url);
        }
      }
    },
  },
});

export const { testData, pushThumbNail } = dataSlice.actions;
export default dataSlice;
