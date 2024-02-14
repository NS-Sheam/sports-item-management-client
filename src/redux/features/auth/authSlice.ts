import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUser = {
  name: string;
  email: string;
  role: string;
  branch?: string;
};

type TInitialState = {
  user: TUser | null;
  token: string | null;
};

const initialState: TInitialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { name, email, role, branch } = action.payload.data;

      state.user = {
        name,
        email,
        role,
        branch,
      };
      state.token = action.payload.token;
    },
    removeUser: (state) => {
      localStorage.removeItem("persist:auth");
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;

export const currentToken = (state: RootState) => state.auth.token;
export const currentUser = (state: RootState) => state.auth.user;
