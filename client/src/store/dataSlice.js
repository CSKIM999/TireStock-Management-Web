import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as Axios from "axios";

const initialState = {
  upload: {
    path: "",
    items: [],
  },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    testData: (state) => {
      state.Images.push("test");
    },
  },
});

export const { testData } = dataSlice.actions;
export default dataSlice;
