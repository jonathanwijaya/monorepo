"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../apis/firebase";
import { TextField, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/authReducers";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setError("Email is required");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setError("");
      const user = userCredential.user;
      const token = await user.getIdToken(); // Get the Firebase ID token
      dispatch(setToken(token)); // Dispatch the action to store the token in Redux
      router.push("/");
    } catch (err) {
      console.log(err)
      setError("Failed to login. Please try again.");
    }
  };
  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" type="submit" fullWidth>
          Login
        </Button>
      </form>
    </div>
  );
}
