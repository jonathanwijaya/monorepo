import * as React from "react";
import { useEffect } from "react";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { fetchAllUsers } from "../apis/userApis";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserError,
  fetchUserStart,
  fetchUserSuccess,
} from "../store/userReducers";
import { RootState } from "../store/store";
import ViewButton from "./viewButton";

export default function DataTable() {
  const dispatch = useDispatch();
  const { loading, data } = useSelector(
    (state: RootState) => state.user
  );
  
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchUserStart());
        const usersData = await fetchAllUsers();
        dispatch(fetchUserSuccess(usersData));
      } catch (err) {
        dispatch(fetchUserError(err));
      }
    };

    fetchData(); // Call the async function
  }, []); // Empty dependency array to run only once on mount

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 2 },
    { field: "name", headerName: "Full Name", flex: 1 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: false,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => <ViewButton id={params.row.id} />,
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        loading={loading}
        initialState={{ pagination: { paginationModel } }}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
