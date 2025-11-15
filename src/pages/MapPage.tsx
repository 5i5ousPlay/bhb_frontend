import React from "react";
import FloodMap from "../features/map/components/FloodMap";
import {
    Box,
    Container,
    Typography,
    Card,
    IconButton,
    Stack,
    useTheme, AppBar, Toolbar, Grid,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import {DesktopSidebar} from "../components/DesktopSidebar";

export default function MapPage() {
    const theme = useTheme();

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
                }}
            >
                <Container maxWidth="xl">
                    {/* Header / toolbar */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={2}
                    >
                        <Box>
                            <Typography variant="h5" fontWeight={600}>
                                Flood Map
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Live sensor network status and flood intensity
                            </Typography>
                        </Box>

                        <Stack direction="row" spacing={1}>
                            <IconButton size="small">
                                <FilterAltIcon />
                            </IconButton>
                            <IconButton size="small">
                                <MyLocationIcon />
                            </IconButton>
                            <IconButton size="small">
                                <RefreshIcon />
                            </IconButton>
                        </Stack>
                    </Stack>

                    {/* Map card */}
                    <Card
                        elevation={4}
                        sx={{
                            borderRadius: 3,
                            overflow: "hidden", // so the map respects rounded corners
                        }}
                    >
                        <Box sx={{ height: "75vh", width: "100%" }}>
                            <FloodMap />
                        </Box>
                    </Card>
                </Container>
            </Box>
        </Box>

    );
}
