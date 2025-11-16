import {
    Box,
    Paper,
    Card,
    Typography,
    CardHeader,
    CardContent,
    Grid,
    Chip,
    Divider,
    Stack,
    Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SensorsIcon from "@mui/icons-material/Sensors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import MapIcon from "@mui/icons-material/Map";
import { useNavigate } from "react-router-dom";
import { ReadingHistoryGraph } from "../../readings/components/ReadingHistoryGraph";
import type { SensorDetailFeature } from "../../sensors/types";

export function SensorDetail({ sensor }: { sensor: SensorDetailFeature }) {
    const coords = sensor.geometry.coordinates;
    const lon = coords?.[0];
    const lat = coords?.[1];
    const readings = sensor.properties.readings ?? [];

    const installedOn = sensor.properties.installed_on
        ? new Date(sensor.properties.installed_on).toLocaleString()
        : "—";

    const isActive = sensor.properties.is_active;

    const latestReading =
        readings.length > 0 ? readings[readings.length - 1] : null;

    const navigate = useNavigate();


    return (
        <Paper
            elevation={3}
            sx={{
                borderRadius: 3,
                overflow: "hidden",
            }}
        >
            <Card sx={{ boxShadow: "none" }}>
                <CardHeader
                    title={
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <SensorsIcon fontSize="small" />
                            <Typography variant="h6">Sensor ID: {sensor.id}</Typography>
                            <Chip
                                size="small"
                                color={isActive ? "success" : "default"}
                                icon={isActive ? <CheckCircleIcon /> : <CancelIcon />}
                                label={isActive ? "Active" : "Inactive"}
                                sx={{ ml: 1 }}
                            />

                        </Stack>

                    }
                    subheader={
                        latestReading
                            ? `Latest reading: ${latestReading.flood_m.toFixed(
                                2
                            )} m at ${new Date(
                                latestReading.reported_on
                            ).toLocaleString()}`
                            : "No readings available yet."
                    }
                />

                <CardContent>
                    {/* Top info grid */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid
                            size={{xs: 12, md: 6}}
                            >
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                gutterBottom
                            >
                                Basic Information
                            </Typography>
                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === "light"
                                            ? "rgba(0,0,0,0.02)"
                                            : "rgba(255,255,255,0.04)",
                                }}
                            >
                                <Stack spacing={1}>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Name
                                        </Typography>
                                        <Typography variant="body1">
                                            {sensor.properties.name || "—"}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <CalendarMonthIcon fontSize="small" color="action" />
                                            <Box>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    Installed On
                                                </Typography>
                                                <Typography variant="body1">{installedOn}</Typography>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Box>
                        </Grid>

                        <Grid
                            size={{xs: 12, md: 6}}>
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                gutterBottom
                            >
                                Location
                            </Typography>
                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === "light"
                                            ? "rgba(0,0,0,0.02)"
                                            : "rgba(255,255,255,0.04)",
                                }}
                            >
                                <Stack spacing={1.5}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <LocationOnIcon fontSize="small" color="action" />
                                        <Box>
                                            <Typography variant="caption" color="text.secondary">
                                                Coordinates
                                            </Typography>
                                            <Typography variant="body1">
                                                {lat?.toFixed(6) ?? "—"}, {lon?.toFixed(6) ?? "—"}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Button
                                        variant="contained"
                                        startIcon={<MapIcon />}
                                        onClick={() => navigate(`/map?sensor=${sensor.id}`)}
                                        sx={{ mt: 1 }}
                                    >
                                        View on Map
                                    </Button>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    {/* History graph */}
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Flood Height History
                        </Typography>
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                backgroundColor: (theme) =>
                                    theme.palette.mode === "light"
                                        ? "rgba(0,0,0,0.01)"
                                        : "rgba(255,255,255,0.02)",
                            }}
                        >
                            <ReadingHistoryGraph sensorHistory={readings} />
                        </Paper>
                    </Box>
                </CardContent>
            </Card>
        </Paper>
    );
}
