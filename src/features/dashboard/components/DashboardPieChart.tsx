import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Card, Typography, useTheme } from "@mui/material";
import { FloodSeverityStats } from "../types";

export function DashboardPieChart({
                                      floodStats,
                                  }: {
    floodStats: FloodSeverityStats;
}) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const {
        no_flood,
        minor,
        moderate,
        severe,
        extreme
    } = floodStats;

    const data = [
        { label: "No Flood", value: no_flood, color: "#0088FE" },
        { label: "Minor", value: minor, color: "#00C49F" },
        { label: "Moderate", value: moderate, color: "#FFBB28" },
        { label: "Severe", value: severe, color: "#FF8042" },
        { label: "Extreme", value: extreme, color: "#C21807" },
    ];

    return (
        <Card
            elevation={0}
            sx={{
                p: 2.5,
                borderRadius: 3,
                width: "100%",
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {/* Header */}
            <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mb: 1, opacity: 0.9 }}
            >
                Sensor Flood Severity
            </Typography>

            <Typography
                variant="body2"
                sx={{
                    color: isDark ? "grey.400" : "text.secondary",
                    mb: 2,
                }}
            >
                Distribution of sensors by flood severity level
            </Typography>

            {/* Pie Chart */}
            <PieChart
                width={350}
                height={350}
                series={[
                    {
                        data,
                        innerRadius: 70,
                        outerRadius: 140,
                        paddingAngle: 3,
                        cornerRadius: 4,
                        arcLabel: (item) => (item.value > 0 ? `${item.value}` : ""),
                        arcLabelRadius: 100,
                        arcLabelMinAngle: 10,
                    },
                ]}
                sx={{
                    "& text": {
                        fontSize: "0.80rem",
                        fontWeight: 600,
                        fill: isDark ? "#e2e8f0" : "#1e293b",
                    },
                }}
                margin={{ top: 20, bottom: 10 }}
            />

            {/* Legend */}
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    mt: 2,
                    justifyContent: "center",
                }}
            >
                {data.map((d) => (
                    <Box
                        key={d.label}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Box
                            sx={{
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                backgroundColor: d.color,
                                boxShadow: `0 0 8px ${d.color}55`,
                            }}
                        />
                        <Typography
                            variant="caption"
                            sx={{ opacity: 0.85 }}
                        >
                            {d.label}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Card>
    );
}
