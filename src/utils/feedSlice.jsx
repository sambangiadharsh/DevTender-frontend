import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,  // Ensure initial state is an object
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addFeed: (state, action) => {
      return action.payload; // Correctly updating user state
    },
    removeFeed: (state,action) => {
      const newFeed=state.filter(r=>r._id!==action.payload);
      return newFeed;
    }
  }
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
