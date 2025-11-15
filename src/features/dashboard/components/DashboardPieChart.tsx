import { PieChart } from '@mui/x-charts/PieChart';
import {Box, Grid, Typography} from "@mui/material";

const data = [
    { label: 'Group A', value: 400, color: '#0088FE' },
    { label: 'Group B', value: 300, color: '#00C49F' },
    { label: 'Group C', value: 300, color: '#FFBB28' },
    { label: 'Group D', value: 200, color: '#FF8042' },
];

// const settings = {
//     margin={{ top: 10, bottom: 10 }},
//     width: 350,
//     height: 350,
//     hideLegend: true,
// };

export function DashboardPieChart() {
    return (
        <Box
            sx={{
                width: "40%",
                height: "25%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 1,
            }}
        >
            <Typography variant="h6">
                Sensor Status
            </Typography>
            <PieChart
                width={350}
                height={350}
                series={[
                    {
                        data,
                        innerRadius: 70,
                        outerRadius: 140,
                        arcLabel: "value",
                    },
                ]}
                margin={{ top: 50, bottom: 10 }}
            />
        </Box>

    );
}