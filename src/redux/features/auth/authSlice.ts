import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TUser = {
  name: string;
  email: string;
  role: string;
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
      const { name, email, role } = action.payload.data;

      state.user = {
        name,
        email,
        role,
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
