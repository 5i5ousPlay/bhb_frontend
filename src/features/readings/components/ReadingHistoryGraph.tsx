import { LineChart } from '@mui/x-charts/LineChart';
import { Box, Typography } from "@mui/material";
import { ReadingSensorHistory } from "../../sensors/types";

export function ReadingHistoryGraph({ sensorHistory }: { sensorHistory?: ReadingSensorHistory }) {
    if (!sensorHistory || sensorHistory.length === 0) {
        return <Typography>No flood readings available.</Typography>;
    }

    // Convert API data → chart format
    const xData = sensorHistory.map(r => new Date(r.reported_on));
    const yData = sensorHistory.map(r => r.flood_m);

    return (
        <Box sx={{ width: "100%", height: 350 }}>
            <LineChart
                xAxis={[
                    {
                        data: xData,
                        scaleType: 'time',   // IMPORTANT
                        label: "Reported On",
                    }
                ]}
                yAxis={[
                    {
                        label: "Flood Height (m)"
                    }
                ]}
                series={[
                    {
                        id: "flood-level",
                        label: "Flood Height (m)",
                        data: yData,
                        color: "#0288D1",
                        curve: "linear"
                    }
                ]}
                height={300}
            />
        </Box>
    );
}
