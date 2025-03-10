// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar"; // Import Sidebar component

const Dashboard = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch assets data from the server
    const fetchAssets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/assets");
        setAssets(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching assets", err);
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token from local storage
    navigate("/"); // Redirect to login page
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

        {/* Dashboard Title */}
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          sx={{ marginBottom: 4 }}
        >
          Asset Dashboard
        </Typography>

        {/* Loading or No Assets Message */}
        {loading ? (
          <Typography variant="h6" align="center">
            Loading...
          </Typography>
        ) : assets.length === 0 ? (
          <Typography variant="h6" align="center" color="textSecondary">
            No assets found.
          </Typography>
        ) : (
          // Asset Cards
          <Grid container spacing={4} justifyContent="center">
            {assets.map((asset) => (
              <Grid item key={asset.asset_id} xs={12} sm={6} md={4}>
                <Card sx={{ padding: 2, minHeight: 350 }}>
                  <CardContent>
                    {/* Asset ID */}
                    <Typography variant="h5" component="div" gutterBottom>
                      <strong>Asset ID:</strong> {asset.asset_id}
                    </Typography>
                    <Divider sx={{ marginBottom: 2 }} />

                    {/* CPU Details */}
                    <Typography variant="body1" gutterBottom>
                      <strong>CPU:</strong> {asset.cpu?.model || "N/A"} (
                      {asset.cpu?.cores} cores, {asset.cpu?.threads} threads)
                    </Typography>

                    {/* RAM Summary */}
                    <Typography variant="body1" gutterBottom>
                      <strong>RAM:</strong> {asset.ram?.total || "N/A"} GB
                      (Used: {asset.ram?.used || "N/A"} GB, Available:{" "}
                      {asset.ram?.available || "N/A"} GB)
                    </Typography>

                    {/* OS Details */}
                    <Typography variant="body1" gutterBottom>
                      <strong>OS:</strong> {asset.os?.os || "N/A"} (
                      {asset.os?.os_version || "N/A"})
                    </Typography>

                    {/* GPU Details */}
                    <Typography variant="body1" gutterBottom>
                      <strong>GPU:</strong>{" "}
                      {asset.gpu?.length > 0
                        ? asset.gpu.map((gpu) => gpu.name).join(", ")
                        : "N/A"}
                    </Typography>

                    {/* Software Details */}
                    <Typography variant="body1" gutterBottom>
                      <strong>Software:</strong>{" "}
                      {asset.software?.length > 0
                        ? asset.software
                            .map((s) => `${s.name} (${s.version})`)
                            .join(", ")
                        : "N/A"}
                    </Typography>

                    <Divider sx={{ marginBottom: 2, marginTop: 2 }} />

                    {/* Last Updated */}
                    <Typography variant="body1" gutterBottom>
                      <strong>Last Updated:</strong>{" "}
                      {new Date(asset.updatedAt).toLocaleString() || "N/A"}
                    </Typography>

                    {/* Changed Status */}
                    <Typography variant="body1">
                      <strong>Changed:</strong>{" "}
                      {asset.is_changed ? "Yes" : "No"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
