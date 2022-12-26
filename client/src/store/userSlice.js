import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as Axios from "axios";

const initialState = {
  userId: "",
  role: "", //true
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

export const test = createAsyncThunk("ASYNC_LOGIN", async (payload) => {
  console.log("IN ASYNC ", payload.body);
  const request = await Axios.post("/api/users/login", payload.body, {
    withCredentials: true,
  }).then((response) => {
    console.log("IN ASYNC ACTION", response);
    if (response.data.loginSuccess) return response.data;
  });
  if (request) return request;
  return { loginSuccess: false };
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      console.log("DISPATCH REGISTUSER", action);
      const request = Axios.post("/api/users/register", action.payload.body, {
        withCredentials: true,
      });
      // }).then((response) => {
      //   console.log("IN SLICE", response.data);
      //   return response.data;
      // });
    },
    loginUser: async (state, action) => {
      console.log("dispatch Success ...", action.payload.body);
      const request = await Axios.post(
        "/api/users/login",
        action.payload.body,
        {
          withCredentials: true,
        }
      ).then((response) => {
        if (response.data.loginSuccess) return response.data.userData;
      });
      console.log("REQ >> ", request);
      // return { ...testObject };
    },
    logoutUser: () => {
      return { ...initialState };
    },
    testUser: (state, action) => {
      const request = Axios.post("/api/users/login", action.payload.body, {
        withCredentials: true,
      }).then((response) => {
        console.log("testResponse", response);
      });
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
  extraReducers: (builder) => {
    builder.addCase(test.fulfilled, (state, action) => {
      console.log("ACTION IN BUILDER", action);
    });
  },
});

export const { registerUser, loginUser, logoutUser, testUser, auth } =
  userSlice.actions;
export default userSlice;
