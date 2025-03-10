import React, { useState } from "react";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/signup", {
        username,
        email,
        password,
      });
      navigate("/"); // Redirect to login page after successful signup
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSignup}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
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
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography variant="body2" align="center" style={{ marginTop: 16 }}>
        Already have an account?{" "}
        <a href="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
          Login
        </a>
      </Typography>
    </Container>
  );
};

export default SignUpPage;
