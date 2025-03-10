import React, { useState } from "react";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Clear previous error messages
    setError("");

    try {
      // Make API call to login
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      // Display error message from API or fallback message
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleLogin}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography variant="body2" align="center" style={{ marginTop: 16 }}>
        Don't have an account?{" "}
        <a href="/signup" style={{ textDecoration: "none", color: "#1976d2" }}>
          Sign Up
        </a>
      </Typography>
    </Container>
  );
};

export default LoginPage;
