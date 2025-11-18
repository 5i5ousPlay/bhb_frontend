import { useParams } from "react-router-dom";
import {
    Box,
    Container,
    Typography,
    useTheme,
    Grid,
    Stack,
    Chip,
    Card,
} from "@mui/material";
import { DesktopSidebar } from "../components/DesktopSidebar";
import { SensorDetail } from "../features/sensors/components/SensorDetail";
import { SensorAlertsCard } from "../features/sensors/components/SensorAlertsCard";
import { useSensorDetail } from "../features/sensors/hooks/useSensorDetail";
import { useSensorDetailAlerts } from "../features/sensors/hooks/useSensorDetailAlerts";
import { LoadingScreen } from "../components/LoadingScreen";

export function SensorDetailPage() {
    const { sensorId } = useParams<{ sensorId: string }>();
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const { data, loading, error } = useSensorDetail(sensorId);
    const { alerts, loading: _loading, error: _error } = useSensorDetailAlerts(2000, sensorId);

    if (loading && !data) return <LoadingScreen />;
    if (error) return <div>Error loading sensor: {error.message}</div>;
    if (!data) return <div>Sensor not found.</div>;


    return (
        <Box sx={{ display: "flex" }}>
            <DesktopSidebar />

            {/* Main content area */}
            <Box
                sx={{
                    flexGrow: 1,
                    minHeight: "100vh",
                    position: "relative",
                    bgcolor: isDark ? "#020617" : "#e5edff",
                    backgroundImage: isDark
                        ? "radial-gradient(circle at 0% 0%, rgba(56,189,248,0.18) 0, transparent 45%), radial-gradient(circle at 100% 100%, rgba(59,130,246,0.15) 0, transparent 50%)"
                        : "radial-gradient(circle at 0% 0%, rgba(59,130,246,0.15) 0, transparent 45%), radial-gradient(circle at 100% 100%, rgba(56,189,248,0.15) 0, transparent 50%)",
                    px: 4,
                    py: 3,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Container maxWidth="xl" sx={{ px: 0 }}>
                    {/* Page heading */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={3}
                    >
                        <Box>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="h5" fontWeight={700}>
                                    Sensor Details
                                </Typography>
                                <Chip
                                    label={`ID: ${sensorId}`}
                                    size="small"
                                    sx={{
                                        fontSize: 11,
                                        fontWeight: 600,
                                        letterSpacing: 0.5,
                                        bgcolor: isDark
                                            ? "rgba(15,23,42,0.9)"
                                            : "rgba(255,255,255,0.95)",
                                        border: isDark
                                            ? "1px solid rgba(148,163,184,0.45)"
                                            : "1px solid rgba(148,163,184,0.35)",
                                    }}
                                />
                            </Stack>

                            <Typography
                                variant="body2"
                                sx={{
                                    mt: 0.5,
                                    color: isDark ? "grey.400" : "text.secondary",
                                }}
                            >
                                View sensor metadata, status, and recent alerts.
                            </Typography>
                        </Box>
                    </Stack>

                    {/* 2-column layout */}
                    <Grid container spacing={3}>
                        {/* Left: Sensor detail */}
                        <Grid
                            size={{xs: 12, lg: 8}}>
                            <Card
                                elevation={0}
                                sx={{
                                    borderRadius: 3,
                                    bgcolor: isDark
                                        ? "rgba(15,23,42,0.95)"
                                        : "rgba(255,255,255,0.98)",
                                    border: isDark
                                        ? "1px solid rgba(148,163,184,0.4)"
                                        : "1px solid rgba(191,219,254,0.9)",
                                    boxShadow: isDark
                                        ? "0 20px 50px rgba(15,23,42,0.85)"
                                        : "0 20px 50px rgba(15,23,42,0.15)",
                                    backdropFilter: "blur(10px)",
                                    p: 2.5,
                                }}
                            >
                                <SensorDetail
                                    sensor={data}
                                    sensorId={sensorId}
                                />
                            </Card>
                        </Grid>

                        {/* Right: Alerts card */}
                        <Grid
                            size={{xs: 12, lg: 4}}
                            >
                            <Card
                                elevation={0}
                                sx={{
                                    borderRadius: 3,
                                    bgcolor: isDark
                                        ? "rgba(15,23,42,0.95)"
                                        : "rgba(255,255,255,0.98)",
                                    border: isDark
                                        ? "1px solid rgba(148,163,184,0.4)"
                                        : "1px solid rgba(191,219,254,0.9)",
                                    boxShadow: isDark
                                        ? "0 20px 50px rgba(15,23,42,0.85)"
                                        : "0 20px 50px rgba(15,23,42,0.15)",
                                    backdropFilter: "blur(10px)",
                                    p: 2.5,
                                }}
                            >
                                <SensorAlertsCard
                                    alerts={alerts}
                                    loading={_loading}
                                    error={_error}
                                />
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
