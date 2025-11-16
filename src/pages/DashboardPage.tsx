import {
    Box,
    Typography,
    Grid,
    Container,
    useTheme,
    Stack,
    Chip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

import { DesktopSidebar } from "../components/DesktopSidebar";
import { DashboardSummary } from "../features/dashboard/components/DashboardSummary";
import { DashboardRecentEvents } from "../features/dashboard/components/DashboardRecentEvents";
import { DashboardLineChart } from "../features/dashboard/components/DashboardLineChart";
import { DashboardPieChart } from "../features/dashboard/components/DashboardPieChart";
import { useDashboardSummary } from "../features/dashboard/hooks/useDashboardSummary";
import { LoadingScreen } from "../components/LoadingScreen";

export default function DashboardPage() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const { data, loading, error } = useDashboardSummary(2000);

    if (loading && !data) return <LoadingScreen />;
    if (error) return <div>Error loading dashboard: {error.message}</div>;
    if (!data) return <div>No dashboard data available.</div>;

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
                    {/* Page header */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={3}
                        spacing={2}
                    >
                        <Box>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="h5" fontWeight={700}>
                                    Dashboard
                                </Typography>
                                <Chip
                                    label="Overview"
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
                                High-level view of sensor network health and flood activity.
                            </Typography>
                        </Box>
                    </Stack>

                    {/* Row 1: Summary (left) + Pie chart (right) */}
                    <Grid container spacing={3} mb={3}>
                        <DashboardSummary summary={data.summary} />

                        <Grid size={{ xs: 12, md: 5 }}>
                            <DashboardPieChart floodStats={data.flood_severity} />
                        </Grid>
                    </Grid>

                    {/* Row 2: Flood Level Trend (full width) */}
                    <Grid container spacing={3} mb={3}>
                        <Grid size={{ xs: 12 }}>
                            <DashboardLineChart />
                        </Grid>
                    </Grid>

                    {/* Row 3: Expandable Recent Alerts Table (full width) */}
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                            <Accordion
                                defaultExpanded
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
                                    "&::before": { display: "none" },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    sx={{
                                        px: 2.5,
                                        py: 1.5,
                                    }}
                                >
                                    <Box>
                                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                                            <ReportProblemIcon color="warning" fontSize="medium" />
                                            <Typography
                                                variant="h6"
                                                fontWeight={700}
                                                sx={{ opacity: 0.9 }}
                                            >
                                                Recent Alerts
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                mt: 0.25,
                                                color: isDark
                                                    ? "grey.400"
                                                    : "text.secondary",
                                                fontSize: 12,
                                            }}
                                        >
                                            Latest events and flood warnings from the network.
                                        </Typography>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails sx={{ px: 2.5, pb: 2.5 }}>
                                    <DashboardRecentEvents />
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
