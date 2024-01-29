import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Hand from "../assets/hand_model.jpeg";

import { io } from "socket.io-client";
// import { getGestures } from "../rest/rest";

const Live: React.FC = () => {
  const [currentGesture, setCurrentGesture] = useState<any>(null);
  // const [allGesture, setAllGesture] = useState<any>("");

  useEffect(() => {
    let socket = io();

    socket.on("debug", (gesture: any) => {
      setCurrentGesture(gesture);
      console.log(gesture);
    });
  });

  return (
    <>
      <Box
        component={"div"}
        sx={{ display: "flex", flex: "row", margin: "100px 15px" }}
      >
        <Box component={"div"} sx={{ margin: "0 50px" }}>
          <Box
            component={"div"}
            sx={{
              margin: "0 100px",
              border: "1px solid black",
              display: "flex",
              flex: "row",
            }}
          >
            <img src={Hand} alt="gesture-placeholder" width="50%" />
            <Box component={"div"} sx={{ margin: "100px 100px" }}>
              {currentGesture ? (
                <>
                  <Typography>{currentGesture}</Typography>
                  <Typography>Thumb: {currentGesture[0]}</Typography>
                  <Typography>Index: {currentGesture[1]}</Typography>
                  <Typography>Middle: {currentGesture[2]}</Typography>
                  <Typography>Ring: {currentGesture[3]}</Typography>
                  <Typography>Pinky: {currentGesture[4]}</Typography>
                </>
              ) : (
                <>
                  {" "}
                  <Typography>Thumb: No Data</Typography>
                  <Typography>Index: No Data</Typography>
                  <Typography>Middle: No Data</Typography>
                  <Typography>Ring: No Data</Typography>
                  <Typography>Pinky: No Data</Typography>
                </>
              )}
            </Box>
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
