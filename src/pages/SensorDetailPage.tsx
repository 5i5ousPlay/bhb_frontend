import { useParams } from "react-router-dom";
import {AppBar, Box, Container, Toolbar, Typography, useTheme} from "@mui/material";
import {DesktopSidebar, drawerWidth} from "../components/DesktopSidebar";
import {SensorDetail} from "../features/sensors/components/SensorDetail";
import {SensorList} from "../features/sensors/components/SensorList";

export function SensorDetailPage() {
    // const { sensorId } = useParams<{ sensorId: string }>();
    const theme = useTheme()
    return (
        <Box sx={{display: "flex"}}>
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                color={"inherit"}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Sensors
                    </Typography>
                </Toolbar>
            </AppBar>
            <DesktopSidebar />
            <Box
                sx={{
                    flexGrow: 1,
                    minHeight: "100vh",
                    bgcolor: theme.palette.mode === "dark"
                        ? "background.default"
                        : "#f3f4f6",
                    py: 3,

                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%"
                }}
            >
                <Container maxWidth={"xl"}>
                    <SensorDetail />
                </Container>
            </Box>
        </Box>
    )
}

