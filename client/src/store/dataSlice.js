import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as Axios from "axios";

const initialState = {
  thumbNail: {
    path: "",
    items: [],
  },
  Loading: false,
};

const revokeAll = (arr) => {
  if (arr) {
    arr.map((item) => {
      if (typeof item === "string") URL.revokeObjectURL(item);
    });
  }
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    testData: (state, action) => {
      state.thumbNail.items.push("test");
    },
    revokeThumbNail: (state) => {
      revokeAll(state.thumbNail.items);
      return { ...initialState };
    },
    pushThumbNail: (state, action) => {
      const { path, index, url } = action.payload;
      const statePath = state.thumbNail.path;
      const pushState = (url, path = null, overwrite = false) => {
        if (overwrite) {
          state.thumbNail.path = path;
          state.thumbNail.items = [url, index];
        } else {
          if (path) state.thumbNail.path = path;
          state.thumbNail.index = index;
          state.thumbNail.items.push([url, index]);
        }
      };
      if (statePath === "") {
        // path 가 비어있을 때
        // dataSlice.caseReducers.revokeThumbNail(state,action)
        pushState(url, path);
      } else {
        // path 가 비어있지 않을때
        if (statePath !== path) {
          // 받아온 path 와 기존 path 가 다를 때 => 기존 데이터 덮어쓰고 경고창
          // TODO ... 현재 items 에 들어있는 url 들을 전부 revoke 해줄 것.
          revokeAll(state.thumbNail.items);
          pushState(url, path, true);
          return alert("[ ERROR ] 오류로 인해 기존 데이터가 덮어씌워집니다!");
        } else {
          // 받아온 path 가 기존 path 와 일치할 때 => 그냥 push
          pushState(url);
        }
      }
    },
    setLoadging: (state, action) => {
      state.Loading = action.payload;
    },
  },
});

export const { testData, pushThumbNail, revokeThumbNail, setLoadging } =
  dataSlice.actions;
export default dataSlice;
