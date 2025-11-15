import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';
import {Typography} from "@mui/material";

const margin = { right: 24 };
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
];

export function DashboardLineChart() {
    return (
        <Box
            sx={{ width: '50%',
                height: 300,
                // display: "flex",
                // flexDirection: "column",
                // alignItems: "center",
                // justifyContent: "flex-start",
                // gap: 1,
        }}>
            <Typography variant="h6">
                Flood Level Trend (Avg.)
            </Typography>
            <LineChart
                series={[
                    { data: pData, label: 'pv' },
                    { data: uData, label: 'uv' },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
                yAxis={[{ width: 50 }]}
                margin={margin}
            />
        </Box>
    );
}