import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SingleUserState {
  loading: boolean;
  data: any;
  error: string | null;
  token: string | null; // Add token property
}

const initialState: SingleUserState = {
  loading: false,
  data: null,
  error: null,
  token: null, // Initialize token as null
};

const singleUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchSingleUserStart: (state) => {
      state.loading = true;
    },
    fetchSingleUserSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchSingleUserError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSingleUserStart,
  fetchSingleUserSuccess,
  fetchSingleUserError,
} = singleUserSlice.actions;
export default singleUserSlice.reducer;
