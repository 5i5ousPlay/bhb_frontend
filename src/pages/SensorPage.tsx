import {Box, Typography, Grid, Paper, AppBar, Toolbar, Card, useTheme, Container} from "@mui/material";
import {DesktopSidebar, drawerWidth} from "../components/DesktopSidebar";
import {SensorList} from "../features/sensors/components/SensorList";


export function SensorPage() {
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
                <SensorList />
            </Container>
            </Box>
        </Box>
        )

}