import { createSlice } from "@reduxjs/toolkit";

// Get user from localStorage safely
const storedUser = localStorage.getItem("user");

let initialState;
try {
  initialState = storedUser ? JSON.parse(storedUser) : { user: null };
} catch (error) {
  console.error("Error parsing stored user:", error);
  initialState = { user: null }; // Fallback in case of corrupted JSON
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save user data
      return action.payload;
    },
    removeUser: () => {
      localStorage.removeItem("user"); // Remove user data
      return { user: null };
    },
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addUser, removeUser,updateUser } = userSlice.actions;
export default userSlice.reducer;
