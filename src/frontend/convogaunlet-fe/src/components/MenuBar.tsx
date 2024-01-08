import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MenuBar: React.FC = () => {
  return (
    <AppBar position="absolute">
      <Toolbar>
        <Link
          to="/live-data"
          style={{ color: "white", textDecoration: "none" }}
        >
          <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
            Live Data
          </Typography>
        </Link>

        <Typography variant="h6" component="div">
          <Link
            to="/gestures"
            style={{ color: "white", textDecoration: "none" }}
          >
            Gestures
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
