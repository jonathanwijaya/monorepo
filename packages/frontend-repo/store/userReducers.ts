import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  loading: boolean;
  data: any;
  error: string | null;
  token: string | null; // Add token property
}

const initialState: UserState = {
  loading: false,
  data: null,
  error: null,
  token: null, // Initialize token as null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true;
    },
    fetchUserSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchUserError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserError } =
  userSlice.actions;
export default userSlice.reducer;
