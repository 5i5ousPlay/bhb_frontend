import {Box, Typography, Grid, Paper, AppBar, Toolbar, Card, useTheme, Container} from "@mui/material";
import {DesktopSidebar} from "../components/DesktopSidebar";
import {AlertList} from "../features/alerts/components/AlertList";


export function AlertsPage() {
    const theme = useTheme()
    return (
        <Box sx={{display: "flex"}}>
            <DesktopSidebar />
            <Box
                sx={{
                    flexGrow: 1,
                    minHeight: "100vh",
                    bgcolor: theme.palette.mode === "dark"
                        ? "background.default"
                        : "#f3f4f6",
                    py: 3,

                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%"
                }}
            >
                <Container maxWidth={"xl"}>
                    <AlertList />
                </Container>
            </Box>
        </Box>
    )

}