import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userinfo: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userinfo = action.payload;
    },
    logOut: (state) => {
      //if we don't need action in parameters eleminate it.
      state.status = false;
      state.userinfo = {};
    },
  },
});

export default authSlice.reducer;
export const { login, logOut } = authSlice.actions;
