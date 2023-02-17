import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as Axios from "axios";

const initialState = {
  userID: "",
  token: "",
  nickname: "",
  isAdmin: false, //true
  // loading: false,
  // state: { type: undefined, data: undefined },
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

export const loginUser = createAsyncThunk("ASYNC_LOGIN", async (payload) => {
  const request = await Axios.post("/api/users/login", payload.body, {
    withCredentials: true,
  }).then((response) => {
    if (response.data.loginSuccess) return response.data;
  });
  if (request) return request;
  return { loginSuccess: false };
});

export const logoutUser = createAsyncThunk("ASYNC_LOGOUT", async (payload) => {
  const request = await Axios.get("/api/users/logout", {
    params: { token: payload.token },
    withCredentials: true,
  });
  if (request.data.success) return { success: true, ...initialState };
  return;
});

export const registerUser = createAsyncThunk(
  "ASYNC_REGISTER",
  async (payload, { rejectWithValue }) => {
    const request = await Axios.post("/api/users/register", payload.body, {
      withCredentials: true,
    });
    if (!request.data.success)
      return rejectWithValue(request.data.err.keyValue);
    return { success: true };
  }
);
export const auth = createAsyncThunk("ASYNC_AUTH", async (payload) => {
  const nativeToken = payload.nativeToken;
  const token = !nativeToken ? "" : nativeToken;
  const request = await Axios.get("/api/users/auth", {
    params: { token: token },
    withCredentials: true,
  });
  if (request.error) return { success: false };
  return { success: true, ...request };
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // registerUser: (state, action) => {
    //   console.log("DISPATCH REGISTUSER", action);
    //   Axios.post("/api/users/register", action.payload.body, {
    //     withCredentials: true,
    //   });
    // },
    // loginUser: async (state, action) => {
    //   console.log("dispatch Success ...", action.payload.body);
    //   const request = await Axios.post(
    //     "/api/users/login",
    //     action.payload.body,
    //     {
    //       withCredentials: true,
    //     }
    //   ).then((response) => {
    //     if (response.data.loginSuccess) return response.data.userData;
    //   });
    //   console.log("REQ >> ", request);
    //   // return { ...testObject };
    // },
    // logoutUser: (state, action) => {
    //   Axios.get("/api/users/logout", {
    //     params: { token: action.token },
    //     withCredentials: true,
    //   }).then((response) => {
    //     if (response.data.error) {
    //       console.log(response);
    //       alert("LOGOUT ERROR");
    //       return
    //     }
    //   });
    //   return { ...initialState };
    // },
    // auth: (state, action) => {
    //   const nativeToken = action.payload.nativeToken;
    //   const token = !nativeToken ? "" : nativeToken;
    //   const request = Axios.get("/api/users/auth", {
    //     params: { token: token },
    //     withCredentials: true,
    //   }).then((response) => response.data);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.loginSuccess) {
          const { loginSuccess, ...response } = action.payload;
          return { ...response };
        } else {
          alert("LOGIN FAILED");
        }
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          return { ...initialState };
        } else {
          alert("LOGOUT ERROR");
        }
        console.log(action);
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.state.type = "pending";
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.state.type = "rejected";
        state.state.data = Object.keys(action.payload)[0];
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("console in addCase", action);
      })
      .addCase(auth.fulfilled, (action) => {
        //   action
        // );
        return { ...action };
      });
  },
});

// export const { auth } = userSlice.actions;
export default userSlice;
