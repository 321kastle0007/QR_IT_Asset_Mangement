import React from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import Sidebar from "./Sidebar"; // Import Sidebar
import { useNavigate } from "react-router-dom"; // Import useNavigate for logout redirection

const SparePartsPage = () => {
  const navigate = useNavigate();

  // Hardcoded spare parts data
  const spareParts = [
    { id: 1, name: "RAM Module 8GB", category: "Memory", price: "40" },
    { id: 2, name: "Intel i7 Processor", category: "CPU", price: "350" },
    { id: 3, name: "NVIDIA GTX 1660", category: "GPU", price: "250" },
    { id: 4, name: "Samsung SSD 500GB", category: "Storage", price: "80" },
  ];

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Redirect to the login page
  };

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

        {/* Spare Parts Title */}
        <Typography variant="h3" align="center" gutterBottom>
          Spare Parts
        </Typography>

        {/* Spare Parts Grid */}
        <Grid container spacing={3} justifyContent="center">
          {spareParts.map((part) => (
            <Grid item key={part.id} xs={12} sm={6} md={4}>
              <Paper sx={{ padding: 3, textAlign: "center" }}>
                <Typography variant="h5">{part.name}</Typography>
                <Typography variant="body1">
                  Category: {part.category}
                </Typography>
                <Typography variant="h6">Price: {part.price}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SparePartsPage;
