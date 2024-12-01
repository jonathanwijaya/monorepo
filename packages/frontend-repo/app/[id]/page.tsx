"use client";

import { useEffect, useState } from "react";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  fetchSingleUserError,
  fetchSingleUserStart,
  fetchSingleUserSuccess,
} from "../../store/singleUsersReducers";
import { editUsers, fetchUserData } from "../../apis/userApis";
import { useRouter } from "next/navigation";

const FormPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params; // Access query parameter

  const dispatch = useDispatch();
  const { loading } = useSelector(
    (state: RootState) => state.singleUserReducer
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchSingleUserStart());
        const usersData = await fetchUserData(id as string);
        setName(usersData.name);
        setEmail(usersData.email);
        setAge(usersData.age);
        dispatch(fetchSingleUserSuccess(usersData));
      } catch (err) {
        dispatch(fetchSingleUserError(err));
      }
    };

    fetchData(); // Call the async function
  }, [id]); // Empty dependency array to run only once on mount

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [formError, setformError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setformError("Email is required");
      return;
    }
    if (!emailRegex.test(email)) {
      setformError("Please enter a valid email address");
      return;
    }
    // Form validation
    if (!name || !email || !age) {
      setformError("All fields are required");
      return;
    }

    if (isNaN(Number(age)) || Number(age) <= 0) {
      setformError("Please enter a valid age");
      return;
    }

    setformError(null); // Reset formError

    // Simulate form submission

    const data = {
      name,
      email,
      age: Number(age),
    };

    editUsers(data, id);

    // Reset the form
    setName("");
    setEmail("");
    setAge("");
    router.push("/");
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        User Information Form
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Age"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        {formError && (
          <Typography color="error" variant="body2" gutterBottom>
            {formError}
          </Typography>
        )}

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FormPage;
