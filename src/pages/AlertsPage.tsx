import {
    Box,
    Typography,
    Card,
    useTheme,
    Container,
    Stack,
    Chip,
} from "@mui/material";
import { DesktopSidebar } from "../components/DesktopSidebar";
import { AlertList } from "../features/alerts/components/AlertList";

export function AlertsPage() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

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
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Container maxWidth="xl" sx={{ px: 0 }}>
                    {/* Page header */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={2.5}
                        spacing={2}
                    >
                        <Box>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="h5" fontWeight={700}>
                                    Alerts
                                </Typography>
                                <Chip
                                    label="Events"
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
                                Review recent flood alerts, sensor warnings, and critical events.
                            </Typography>
                        </Box>
                    </Stack>

                    {/* Alerts list card */}
                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            overflow: "hidden",
                            bgcolor: isDark
                                ? "rgba(15,23,42,0.95)"
                                : "rgba(255,255,255,0.96)",
                            border: isDark
                                ? "1px solid rgba(148,163,184,0.4)"
                                : "1px solid rgba(191,219,254,0.9)",
                            boxShadow: isDark
                                ? "0 24px 60px rgba(15,23,42,0.9)"
                                : "0 20px 50px rgba(15,23,42,0.18)",
                            backdropFilter: "blur(10px)",
                            p: 2,
                        }}
                    >
                        <AlertList />
                    </Card>
                </Container>
            </Box>
        </Box>
    );
}
