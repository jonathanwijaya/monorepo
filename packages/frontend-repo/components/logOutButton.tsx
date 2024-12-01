"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Box, Button } from "@mui/material";
import { deleteToken } from "../store/authReducers";
import { useRouter } from "next/navigation";

const LogOutButton = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const { loading } = useSelector(
    (state: RootState) => state.user
  );

  const handleLogout = async () => {
    dispatch(deleteToken()); // Dispatch the action to store the token in Redux
    router.push("/login");
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      mb={2} // Add some space below the button
    >
      <Button variant="contained" onClick={handleLogout} disabled={loading}>
        {loading ? "Loading..." : "Log Out"}
      </Button>{" "}
    </Box>
  );
};

export default LogOutButton;
