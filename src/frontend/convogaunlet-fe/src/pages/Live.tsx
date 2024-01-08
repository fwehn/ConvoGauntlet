import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Hand from "../assets/Hand.png";

const Live: React.FC = () => {
  return (
    <>
      <Box
        component={"div"}
        sx={{ display: "flex", flex: "row", margin: "100px 15px" }}
      >
        <Box component={"div"} sx={{ margin: "0 100px" }}>
          <Box component={"div"} sx={{ margin: "0 100px" }}>
            <img src={Hand} alt="gesture-placeholder" />
          </Box>
          <Button
            variant="contained"
            sx={{
              borderRadius: "20px",
              margin: "15px 100px",
            }}
            size="large"
          >
            Capture
          </Button>
        </Box>
        <Box
          component={"div"}
          sx={{
            display: "flex",
            border: 1,
            margin: "220px 0",
            minWidth: 300,
            bgcolor: "lightgray",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography component={"h2"} sx={{ fontSize: 30 }}>
            Hello
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Live;
