"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserError,
} from "../store/userReducers";
import { RootState } from "../store/store";
import { Button } from "@mui/material";
import { fetchAllUsers } from "../apis/userApis";

const UpdateButton = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(
    (state: RootState) => state.user
  );

  const handleUpdate = async () => {
    dispatch(fetchUserStart());
    try {
      const userData = await fetchAllUsers();
      dispatch(fetchUserSuccess(userData));
    } catch (err) {
      console.log(err)
      dispatch(fetchUserError("Failed to fetch data"));
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleUpdate} disabled={loading}>
        {loading ? "Loading..." : "Fetch User Info"}
      </Button>
    </div>
  );
};

export default UpdateButton;
