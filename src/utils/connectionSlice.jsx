import { createSlice } from "@reduxjs/toolkit";

const initialState = []; // Initial state is an array

const connectionSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    addConnections: (state, action) => {
      return action.payload; // The new state is the array from action.payload
    },
    removeConnections: (state) => {
      return []; // Reset to an empty array
    },
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
