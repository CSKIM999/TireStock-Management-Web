import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  isAuth: "", //true
  isAdmin: "",
  email: "",
  username: "",
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
    testUser: (state) => {
      state._id = "123";
      state.email = "abcd";
      state.username = "김찬섭";
    },
    loginUser: (state, action) => {
      state._id = action.payload._id;
      state.email = action.payload.email;
      state.username = action.payload.username;
    },
    logoutUser: () => {
      return { ...initialState };
    },
    auth: (state) => {},
  },
});

export const { loginUser, logoutUser, testUser, auth } = userSlice.actions;
export default userSlice;
