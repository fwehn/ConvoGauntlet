import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button } from "@mui/material";
import EditDialog from "./EditDialog";
import { getGestures, deleteGesture } from "../rest/rest.tsx";

const CenteredTable: React.FC = () => {
    const [gestureMap, setGestureMap] = useState([{
        gesture: "",
        sentence: "",
    }]);

    useEffect(() => {
        getGestures()
            .then(gestures => {
                const tmpGestureMap: {
                    gesture: string,
                    sentence: string,
                }[] = [];

                for (const i in gestures) {
                    tmpGestureMap.push({ gesture: i, sentence: gestures[i] });
                }

                setGestureMap(tmpGestureMap);
            }).catch(console.error);
    }, []);


    return (
        <Box
            sx={{
                display: "block",
                height: "100vh",
                margin: "100px 200px",
            }}
        >
            <TableContainer>
                <Table sx={{ border: 1 }}>
                    <TableHead sx={{ border: 1 }}>
                        <TableRow style={{ background: "#f2f2f2" }}>
                            <TableCell sx={{ fontWeight: 800, border: 1 }}>Gesture</TableCell>
                            <TableCell sx={{ fontWeight: 800, border: 1 }}>Sentence</TableCell>
                            <TableCell sx={{ fontWeight: 800, border: 1 }}> Edit</TableCell>
                            <TableCell sx={{ fontWeight: 800, border: 1 }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gestureMap.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ border: 1 }}>
                                    {row["gesture"]}
                                </TableCell>
                                <TableCell sx={{ border: 1 }}>
                                    {row["sentence"]}
                                </TableCell>
                                <TableCell sx={{ border: 1 }}>
                                    <EditDialog gesture={row["gesture"]} sentence={row["sentence"]}
                                                onSaved={(sentence: string) => {
                                                    gestureMap[index]["sentence"] = sentence;
                                                    setGestureMap([...gestureMap]);
                                                }}></EditDialog>
                                </TableCell>

                                <TableCell sx={{ border: 1 }}>
                                    <Button onClick={() => deleteGesture(row["gesture"])
                                        .then(() => {
                                            gestureMap.splice(index, 1);

                                            setGestureMap([...gestureMap]);
                                        })}
                                            variant="contained"
                                            sx={{
                                                borderRadius: "20px",
                                                margin: "20px 20px",
                                            }}
                                            size="small">
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CenteredTable;
