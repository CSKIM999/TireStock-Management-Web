import { createSlice } from "@reduxjs/toolkit";
import * as Axios from "axios";

const initialState = {
  _id: "",
  isAuth: "", //true
  isAdmin: "",
  email: "",
  nickname: "",
};

// 이렇게 loading state를 통해서 skeleton 이나 progress 사용하는것도 좋아보임.
// getUsersStart: (state, action) => {
//   state.loading = true;
// },
// getUsersSuccess: (state, action) => {
//   state.loading = false;
//   state.data = action.payload;
// },
// getUsersRemove: (state, action) => {
//   state.loading = false;
//   state.data = [];
// },
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      console.log("DISPATCH REGISTUSER", action);
      const request = Axios.post("/api/users/register", action.payload.body, {
        withCredentials: true,
      }).then((response) => {
        console.log("IN SLICE", response.data);
        return response.data;
      });
    },
    loginUser: (state, action) => {
      console.log("dispatch Success ...", action.payload.body);
      const request = Axios.post("/api/users/login", action.payload.body, {
        withCredentials: true,
      }).then((response) => {
        console.log("test user response ", request);
        console.log("Login Success IN SLICE ...", response.data);
        return response.data;
      });
      const testObject = {
        _id: 1234,
        isAdmin: true,
        isAuth: true,
        email: "test@te.st",
        nickname: "cskim",
      };
      // return { ...testObject };
    },
    logoutUser: () => {
      return { ...initialState };
    },
    auth: (state, action) => {
      const nativeToken = action.payload.nativeToken;
      const token = !nativeToken ? "" : nativeToken;
      const request = Axios.get("/api/users/auth", {
        params: { token: token },
        withCredentials: true,
      }).then((response) => response.data);

      console.log(request);
    },
  },
});

export const { registerUser, loginUser, logoutUser, testUser, auth } =
  userSlice.actions;
export default userSlice;
