import {
    Card,
    Grid,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    useTheme,
    Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecentAlerts } from "../hooks/useRecentAlerts";

export function DashboardRecentEvents() {
    const { data, loading, error } = useRecentAlerts(2000); // data: AlertListResults
    const navigate = useNavigate();
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const alerts = data ?? [];

    return (
        <Grid
            size={{xs: 12}}
            >
            <Card
                elevation={0}
                sx={{
                    borderRadius: 3,
                    p: 2.5,
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
                }}
            >
                {/*<Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>*/}
                {/*    Recent Alerts*/}
                {/*</Typography>*/}
                {/*<Typography*/}
                {/*    variant="body2"*/}
                {/*    sx={{*/}
                {/*        mb: 2,*/}
                {/*        color: isDark ? "grey.400" : "text.secondary",*/}
                {/*        fontSize: 12,*/}
                {/*    }}*/}
                {/*>*/}
                {/*    Latest flood alerts and sensor warnings in the network.*/}
                {/*</Typography>*/}

                <TableContainer
                    component={Paper}
                    sx={{
                        bgcolor: "transparent",
                        boxShadow: "none",
                    }}
                >
                    <Table size="small" aria-label="recent alerts table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sensor</TableCell>
                                <TableCell>Flood Height (m)</TableCell>
                                <TableCell>Message</TableCell>
                                <TableCell>Reported On</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading && alerts.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <Typography
                                            variant="body2"
                                            sx={{ py: 2, textAlign: "center" }}
                                        >
                                            Loading recent alerts…
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}

                            {error && !loading && (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <Typography
                                            variant="body2"
                                            color="error"
                                            sx={{ py: 2, textAlign: "center" }}
                                        >
                                            Failed to load recent alerts: {error.message}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}

                            {!loading && !error && alerts.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <Typography
                                            variant="body2"
                                            sx={{ py: 2, textAlign: "center" }}
                                        >
                                            No recent alerts.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}

                            {alerts.map((alert) => {
                                const sensorId = alert.sensor.id;
                                const floodHeight = alert.reading.flood_m;
                                const reportedOn = new Date(
                                    alert.reported_on
                                ).toLocaleString("en-PH", {
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                });

                                return (
                                    <TableRow
                                        key={alert.id}
                                        hover
                                        sx={{
                                            "&:last-child td, &:last-child th": {
                                                border: 0,
                                            },
                                        }}
                                    >
                                        {/* Sensor (clickable) */}
                                        <TableCell>
                                            <Button
                                                variant="text"
                                                size="small"
                                                sx={{
                                                    textTransform: "none",
                                                    px: 0,
                                                    minWidth: 0,
                                                }}
                                                onClick={() =>
                                                    navigate(`/sensors/${sensorId}`)
                                                }
                                            >
                                                {sensorId}
                                            </Button>
                                        </TableCell>

                                        {/* Flood Height */}
                                        <TableCell>
                                            {floodHeight.toFixed(2)}
                                        </TableCell>

                                        {/* Message */}
                                        <TableCell sx={{ maxWidth: 260 }}>
                                            <Typography
                                                variant="body2"
                                                noWrap
                                                title={alert.message}
                                            >
                                                {alert.message}
                                            </Typography>
                                        </TableCell>

                                        {/* Reported On */}
                                        <TableCell>{reportedOn}</TableCell>

                                        {/* Go to Map */}
                                        <TableCell align="right">
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() =>
                                                    navigate(
                                                        `/map?sensor=${sensorId}`
                                                    )
                                                }
                                            >
                                                Go to Map
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Grid>
    );
}
