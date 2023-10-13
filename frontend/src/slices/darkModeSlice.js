import { createSlice } from "@reduxjs/toolkit";
const darkModeSlice = createSlice({
  name: "darkmode",
  initialState: false,
  reducers: {
    toggleDarkMode: (state) => !state,
  },
});
export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
