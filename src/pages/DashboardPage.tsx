// // src/pages/DashboardPage.tsx
// import { useNavigate } from "react-router-dom";
//
// export default function DashboardPage() {
//     const navigate = useNavigate();
//     return (
//         <div>
//             <h1>Dashboard (WIP)</h1>
//             <button onClick={() => navigate("/map")}>
//                 Go to Flood Map
//             </button>
//         </div>
//     );
// }

import { Box, Typography, Grid, Paper, AppBar, Toolbar } from "@mui/material";
import { DesktopSidebar, drawerWidth } from "../components/DesktopSidebar";
import { DashboardSummary } from "../features/dashboard/components/DashboardSummary";
import { DashboardRecentEvents } from "../features/dashboard/components/DashboardRecentEvents";
import { DashboardLineChart } from "../features/dashboard/components/DashboardLineChart";
import { DashboardPieChart } from "../features/dashboard/components/DashboardPieChart";

export default function DashboardPage() {
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                color={"inherit"}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <DesktopSidebar />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Grid container spacing={2} paddingTop={7}>
                    <DashboardSummary />
                    <DashboardRecentEvents />
                </Grid>
                <Grid container spacing={2} paddingTop={3}>
                    <DashboardPieChart />
                    <DashboardLineChart />
                </Grid>
            </Box>
        </Box>

    );
}

