import { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import {
    Box,
    Card,
    Typography,
    useTheme,
    Stack,
    ToggleButtonGroup,
    ToggleButton,
    IconButton,
    Tooltip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useFloodTrend } from "../hooks/useFloodTrend";

const margin = { right: 24, left: 40, top: 20, bottom: 30 };

export function DashboardLineChart() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const [mode, setMode] = useState<"hour" | "minute">("hour");

    const { data, loading, error, refetch } = useFloodTrend(mode, 2000);

    const xLabels =
        data?.map((d) =>
            new Date(d.ts).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })
        ) ?? [];
    const yValues = data?.map((d) => d.avg_flood) ?? [];

    const handleModeChange = (
        _event: React.MouseEvent<HTMLElement>,
        value: "hour" | "minute" | null
    ) => {
        if (!value) return;
        setMode(value);
    };

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 3,
                p: 2.5,
                height: "100%",
                bgcolor: isDark
                    ? "rgba(15,23,42,0.95)"
                    : "rgba(255,255,255,0.98)",
                border: isDark
                    ? "1px solid rgba(148,163,184,0.4)"
                    : "1px solid rgba(191,219,254,0.9)",
                boxShadow: isDark
                    ? "0 20px 50px rgba(15,23,42,0.85)"
                    : "0 20px 50px rgba(15,23,42,0.18)",
                backdropFilter: "blur(10px)",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Header */}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={1.5}
                spacing={1.5}
            >
                <Box>
                    <Typography variant="h6" fontWeight={700}>
                        Flood Level Trend
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            mt: 0.25,
                            color: isDark ? "grey.400" : "text.secondary",
                            fontSize: 12,
                        }}
                    >
                        Average flood height over time (
                        {mode === "hour" ? "per hour" : "per minute"}).
                    </Typography>
                </Box>

                <Stack direction="row" alignItems="center" spacing={1}>
                    <ToggleButtonGroup
                        size="small"
                        value={mode}
                        exclusive
                        onChange={handleModeChange}
                        sx={{
                            bgcolor: isDark
                                ? "rgba(15,23,42,0.9)"
                                : "rgba(248,250,252,0.9)",
                            borderRadius: 999,
                            "& .MuiToggleButton-root": {
                                border: "none",
                                textTransform: "none",
                                fontSize: 12,
                                px: 1.4,
                                py: 0.3,
                            },
                        }}
                    >
                        <ToggleButton value="hour">Hourly</ToggleButton>
                        <ToggleButton value="minute">Per Minute</ToggleButton>
                    </ToggleButtonGroup>

                    <Tooltip title="Refresh now">
                        <IconButton
                            size="small"
                            onClick={refetch}
                            sx={{
                                borderRadius: 2,
                                bgcolor: isDark
                                    ? "rgba(15,23,42,0.9)"
                                    : "rgba(255,255,255,0.9)",
                                border: isDark
                                    ? "1px solid rgba(148,163,184,0.45)"
                                    : "1px solid rgba(148,163,184,0.35)",
                                "&:hover": {
                                    bgcolor: isDark
                                        ? "rgba(30,64,175,0.9)"
                                        : "rgba(59,130,246,0.08)",
                                },
                            }}
                        >
                            <RefreshIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Stack>

            {/* Chart area */}
            <Box sx={{ flexGrow: 1, minHeight: 260, height: "100%" }}>
                {error ? (
                    <Typography
                        variant="body2"
                        color="error"
                        sx={{ mt: 4, textAlign: "center" }}
                    >
                        Failed to load flood trend.
                    </Typography>
                ) : (
                    <LineChart
                        series={[
                            {
                                data: yValues,
                                label: "Avg flood height (m)",
                                showMark: false,
                                curve: "monotoneX",
                            },
                        ]}
                        xAxis={[
                            {
                                scaleType: "point",
                                data: xLabels,
                                tickLabelStyle: {
                                    fontSize: 11,
                                    angle: -45,        // rotate
                                    textAnchor: "end", // align nicely after rotation
                                },
                            },
                        ]}
                        yAxis={[
                            {
                                width: 52,
                                tickLabelStyle: {
                                    fontSize: 11,
                                },
                            },
                        ]}
                        margin={{ ...margin, bottom: 50 }} // a bit more space for rotated labels
                        loading={loading}
                        sx={{
                            "& .MuiLineElement-root": {
                                strokeWidth: 2.2,
                            },
                            "& .MuiAreaElement-root": {
                                fillOpacity: 0.08,
                            },
                            "& .MuiChartsTooltip-root": {
                                borderRadius: 2,
                            },
                            height: "100%",
                            width: "100%"
                        }}
                    />
                )}
            </Box>
        </Card>
    );
}
