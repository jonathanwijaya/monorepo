"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import BasicTable from "../components/table";
import LogOutButton from "../components/logOutButton";

const Page = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Box
        display="flex"
        justifyContent="space-between" // Space out the button and typography
        alignItems="center" // Vertically align items
        mb={2} // Margin-bottom for spacing
      >
        <Typography variant="h4">Welcome to the Main Page</Typography>
        <LogOutButton />
      </Box>
      <BasicTable />
    </div>
  );
};

export default Page;
