import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";
import axios from "axios";
import Sidebar from "./Sidebar"; // Import Sidebar
import { useNavigate } from "react-router-dom"; // Import useNavigate for logout redirection

const AssetSummaryPage = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch asset summary data from the server
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/assets/summary"
        );
        setSummary(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching asset summary", err);
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Redirect to the login page
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", paddingTop: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      <Box sx={{ flexGrow: 1, padding: 3 }}>
        {/* Logout Button */}
        <Grid container justifyContent="flex-end" sx={{ marginBottom: 3 }}>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Grid>

        {/* Asset Summary Title */}
        <Typography variant="h3" align="center" gutterBottom>
          Asset Summary
        </Typography>

        {/* Asset Summary Cards */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 3, textAlign: "center" }}>
              <Typography variant="h5">Total Assets</Typography>
              <Typography variant="h6">{summary.totalAssets}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 3, textAlign: "center" }}>
              <Typography variant="h5">Changed Assets</Typography>
              <Typography variant="h6">{summary.changedAssets}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ padding: 3, textAlign: "center" }}>
              <Typography variant="h5">Unchanged Assets</Typography>
              <Typography variant="h6">{summary.unchangedAssets}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AssetSummaryPage;
