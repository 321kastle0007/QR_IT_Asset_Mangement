// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { Box, List, ListItem, ListItemText, Divider } from "@mui/material";

const Sidebar = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: 250,
        backgroundColor: "#f4f4f4",
        padding: 2,
      }}
    >
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/assets">
          <ListItemText primary="Assets" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/spare-parts">
          <ListItemText primary="Spare Parts" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
