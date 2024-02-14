import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  sales: [],
};
const salesSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {},
});

export default salesSlice.reducer;
