import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Typography } from "@mui/material";
import { ReadingSensorHistory } from "../../sensors/types";
import { LoadingScreen } from "../../../components/LoadingScreen";

const WINDOW_MINUTES = 10; // 👈 live window size

export function ReadingHistoryGraph(props: {
    sensorHistory?: ReadingSensorHistory;
    loading: boolean;
    error: Error | null;
}) {
    const { sensorHistory, loading, error } = props;

    if (loading) {
        return <LoadingScreen />;
    }

    if (error) {
        return <div>Error loading sensor: {error.message}</div>;
    }

    if (!sensorHistory || sensorHistory.length === 0) {
        return <Typography>No flood readings available.</Typography>;
    }

    // 1) Ensure readings are sorted by time
    const sortedHistory = [...sensorHistory].sort(
        (a, b) =>
            new Date(a.reported_on).getTime() -
            new Date(b.reported_on).getTime()
    );

    // 2) Define sliding time window: [latest - WINDOW_MINUTES, latest]
    const latestTime = new Date(
        sortedHistory[sortedHistory.length - 1].reported_on
    );
    const windowEnd = latestTime;
    const windowStart = new Date(
        windowEnd.getTime() - WINDOW_MINUTES * 60 * 1000
    );

    // 3) Filter readings that fall inside the window
    const windowedHistory = sortedHistory.filter((r) => {
        const t = new Date(r.reported_on).getTime();
        return t >= windowStart.getTime() && t <= windowEnd.getTime();
    });

    if (windowedHistory.length === 0) {
        // If no points in the last WINDOW_MINUTES, fallback to last few readings
        const fallback = sortedHistory.slice(-20);
        const xFallback = fallback.map((r) => new Date(r.reported_on));
        const yFallback = fallback.map((r) => r.flood_m);

        return (
            <Box sx={{ width: "100%", height: 350 }}>
                <LineChart
                    xAxis={[
                        {
                            data: xFallback,
                            scaleType: "time",
                            label: "Reported On",
                        },
                    ]}
                    yAxis={[{ label: "Flood Height (m)" }]}
                    series={[
                        {
                            id: "flood-level",
                            label: "Flood Height (m)",
                            data: yFallback,
                            curve: "linear",
                        },
                    ]}
                    height={300}
                />
            </Box>
        );
    }

    // 4) Build chart data for the sliding window
    const xData = windowedHistory.map((r) => new Date(r.reported_on));
    const yData = windowedHistory.map((r) => r.flood_m);

    return (
        <Box sx={{ width: "100%", height: 350 }}>
            <LineChart
                xAxis={[
                    {
                        data: xData,
                        scaleType: "time",
                        label: "Reported On",
                        // 👇 These force the viewport to "move" as new data comes in
                        min: windowStart,
                        max: windowEnd,
                    },
                ]}
                yAxis={[{ label: "Flood Height (m)" }]}
                series={[
                    {
                        id: "flood-level",
                        label: "Flood Height (m)",
                        data: yData,
                        curve: "linear",
                    },
                ]}
                height={300}
            />
        </Box>
    );
}
