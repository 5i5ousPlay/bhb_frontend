import { Grid, Card, CardContent, Typography, useTheme, Box, Stack } from "@mui/material";
import { SummaryStats } from "../types";

export function DashboardSummary({ summary }: { summary: SummaryStats }) {
    const theme = useTheme();
    const { total, online, flooded, critical, alerts_24hrs } = summary;
    const isDark = theme.palette.mode === "dark";

    const baseTileBg = isDark
        ? "rgba(15,23,42,0.97)"
        : "rgba(255,255,255,0.96)";

    return (
        <Grid
            size={{xs: 12, md: 6}}
            >
            {/* Outer "Summary" card, glassy like other pages */}
            <Card
                elevation={0}
                sx={{
                    borderRadius: 3,
                    p: 2.5,
                    bgcolor: isDark ? "rgba(15,23,42,0.95)" : "rgba(255,255,255,0.98)",
                    border: isDark
                        ? "1px solid rgba(148,163,184,0.4)"
                        : "1px solid rgba(191,219,254,0.9)",
                    boxShadow: isDark
                        ? "0 20px 50px rgba(15,23,42,0.85)"
                        : "0 20px 50px rgba(15,23,42,0.15)",
                    backdropFilter: "blur(10px)",
                }}
            >
                {/* Header */}
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                    <Typography variant="h6" fontWeight={700}>
                        Network Summary
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            opacity: 0.7,
                            letterSpacing: 0.5,
                            textTransform: "uppercase",
                        }}
                    >
                        Sensors & Alerts
                    </Typography>
                </Stack>

                <Grid container spacing={2}>
                    {/* Active Sensors */}
                    <Grid
                        size={{xs: 12, md: 6}}
                        >
                        <Card
                            elevation={0}
                            sx={{
                                borderRadius: 2,
                                bgcolor: baseTileBg,
                                backgroundImage:
                                    "linear-gradient(135deg, rgba(22,163,74,0.18), rgba(74,222,128,0.08))",
                                border: "1px solid rgba(34,197,94,0.4)",
                                boxShadow: "0 12px 30px rgba(22,163,74,0.32)",
                            }}
                        >
                            <CardContent sx={{ py: 1.8 }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ opacity: 0.85, mb: 0.5 }}
                                >
                                    Active Sensors
                                </Typography>
                                <Typography
                                    variant="h4"
                                    align="center"
                                    fontWeight={700}
                                    sx={{ lineHeight: 1.2 }}
                                >
                                    {online} / {total}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Flooded Sensors */}
                    <Grid
                        size={{xs: 12, md: 6}}
                        >
                        <Card
                            elevation={0}
                            sx={{
                                borderRadius: 2,
                                bgcolor: baseTileBg,
                                backgroundImage:
                                    "linear-gradient(135deg, rgba(190,24,93,0.25), rgba(244,114,182,0.08))",
                                border: "1px solid rgba(236,72,153,0.5)",
                                boxShadow: "0 12px 30px rgba(190,24,93,0.35)",
                            }}
                        >
                            <CardContent sx={{ py: 1.8 }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ opacity: 0.85, mb: 0.5 }}
                                >
                                    Flooded Sensors
                                </Typography>
                                <Typography
                                    variant="h4"
                                    align="center"
                                    fontWeight={700}
                                    sx={{ lineHeight: 1.2 }}
                                >
                                    {flooded}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Critical Sensors */}
                    <Grid
                        size={{xs: 12, md: 6}}
                        >
                        <Card
                            elevation={0}
                            sx={{
                                borderRadius: 2,
                                bgcolor: baseTileBg,
                                backgroundImage:
                                    "linear-gradient(135deg, rgba(248,113,113,0.24), rgba(251,146,60,0.1))",
                                border: "1px solid rgba(248,113,113,0.55)",
                                boxShadow: "0 12px 30px rgba(220,38,38,0.35)",
                            }}
                        >
                            <CardContent sx={{ py: 1.8 }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ opacity: 0.85, mb: 0.5 }}
                                >
                                    Critical Level Sensors
                                </Typography>
                                <Typography
                                    variant="h4"
                                    align="center"
                                    fontWeight={700}
                                    sx={{ lineHeight: 1.2 }}
                                >
                                    {critical}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Alerts in last 24h */}
                    <Grid
                        size={{xs: 12, md: 6}}
                        >
                        <Card
                            elevation={0}
                            sx={{
                                borderRadius: 2,
                                bgcolor: baseTileBg,
                                backgroundImage:
                                    "linear-gradient(135deg, rgba(249,115,22,0.24), rgba(251,191,36,0.12))",
                                border: "1px solid rgba(249,115,22,0.55)",
                                boxShadow: "0 12px 30px rgba(194,65,12,0.35)",
                            }}
                        >
                            <CardContent sx={{ py: 1.8 }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ opacity: 0.85, mb: 0.5 }}
                                >
                                    Alerts in Last 24 Hours
                                </Typography>
                                <Typography
                                    variant="h4"
                                    align="center"
                                    fontWeight={700}
                                    sx={{ lineHeight: 1.2 }}
                                >
                                    {alerts_24hrs}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
}
