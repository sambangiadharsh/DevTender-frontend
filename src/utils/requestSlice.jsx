import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [],  // Ensure initial state is an object
};

const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    addRequest: (state, action) => {
      return action.payload; // Correctly updating user state
    },
    removeRequest: (state,action) => {
      const newArray=state.filter(r=>r._id!==action.payload);
      return newArray;
    }
  }
});

export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
