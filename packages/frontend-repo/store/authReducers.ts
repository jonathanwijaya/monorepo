import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  token: string | null; // Add token property
  isLoggedin: boolean;
}

const initialState: UserState = {
  token: null, // Initialize token as null,
  isLoggedin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      console.log(state, action);
      state.token = action.payload; // Set the token in the state
      state.isLoggedin = true;
    },
    deleteToken: (state) => {
      state.token = null;
      state.isLoggedin = false;
    },
  },
});

export const { setToken, deleteToken } = authSlice.actions;
export default authSlice.reducer;
