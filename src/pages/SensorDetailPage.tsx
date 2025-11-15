// src/pages/SensorDetailPage.tsx
import { useParams } from "react-router-dom";
import {
    AppBar,
    Box,
    Container,
    Toolbar,
    Typography,
    useTheme,
    Grid,
} from "@mui/material";
import { DesktopSidebar, drawerWidth } from "../components/DesktopSidebar";
import { SensorDetail } from "../features/sensors/components/SensorDetail";
import { SensorAlertsCard } from "../features/sensors/components/SensorAlertsCard";
import { useSensorDetail } from "../features/sensors/hooks/useSensorDetail";
import { LoadingScreen } from "../components/LoadingScreen";

export function SensorDetailPage() {
    const { sensorId } = useParams<{ sensorId: string }>();
    const theme = useTheme();
    const { data, loading, error } = useSensorDetail(sensorId);

    if (loading && !data) return <LoadingScreen />;
    if (error) return <div>Error loading sensor: {error.message}</div>;
    if (!data) return <div>Sensor not found.</div>;

    const alerts = data.properties.alerts ?? [];

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                color="inherit"
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
                    bgcolor:
                        theme.palette.mode === "dark"
                            ? "background.default"
                            : "#f3f4f6",
                    py: 3,
                    mt: 8, // to clear the AppBar
                }}
            >
                <Container maxWidth="xl">
                    <Grid container spacing={3}>
                        <Grid
                            size={{xs: 12, lg: 8}}
                            >
                            <SensorDetail sensor={data} />
                        </Grid>
                        <Grid
                            size={{xs:12, lg: 4}}
                            >
                            <SensorAlertsCard alerts={alerts} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
