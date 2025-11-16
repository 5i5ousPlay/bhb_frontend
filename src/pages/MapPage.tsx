import React from "react";
import FloodMap from "../features/map/components/FloodMap";
import {
    Box,
    Container,
    Typography,
    Card,
    IconButton,
    Stack,
    useTheme,
    Chip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { DesktopSidebar } from "../components/DesktopSidebar";

export default function MapPage() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    return (
        <Box sx={{ display: "flex" }}>
            <DesktopSidebar />

            {/* Main content area */}
            <Box
                sx={{
                    flexGrow: 1,
                    minHeight: "100vh",
                    position: "relative",
                    // Match the sidebar gradient vibe
                    bgcolor: isDark ? "#020617" : "#e5edff",
                    backgroundImage: isDark
                        ? "radial-gradient(circle at 0% 0%, rgba(56,189,248,0.18) 0, transparent 45%), radial-gradient(circle at 100% 100%, rgba(59,130,246,0.15) 0, transparent 50%)"
                        : "radial-gradient(circle at 0% 0%, rgba(59,130,246,0.15) 0, transparent 45%), radial-gradient(circle at 100% 100%, rgba(56,189,248,0.15) 0, transparent 50%)",
                    px: 4,
                    py: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Container maxWidth="xl" sx={{ px: 0 }}>
                    {/* Header / toolbar */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={2.5}
                        spacing={2}
                    >
                        <Box>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="h5" fontWeight={700}>
                                    Flood Map
                                </Typography>
                                <Chip
                                    label="Live"
                                    size="small"
                                    color="success"
                                    sx={{
                                        fontSize: 11,
                                        fontWeight: 600,
                                        letterSpacing: 0.5,
                                    }}
                                />
                            </Stack>
                            <Typography
                                variant="body2"
                                sx={{
                                    mt: 0.5,
                                    color: isDark ? "grey.400" : "text.secondary",
                                }}
                            >
                                Monitor real-time flood levels and sensor coverage across the network.
                            </Typography>
                        </Box>

                        {/* Action buttons */}
                        <Stack direction="row" spacing={1.2}>
                            <IconButton
                                size="small"
                                sx={{
                                    borderRadius: 2,
                                    px: 1.2,
                                    bgcolor: isDark
                                        ? "rgba(15,23,42,0.9)"
                                        : "rgba(255,255,255,0.9)",
                                    border: isDark
                                        ? "1px solid rgba(148,163,184,0.45)"
                                        : "1px solid rgba(148,163,184,0.35)",
                                    boxShadow: "0 0 12px rgba(15,23,42,0.3)",
                                    "&:hover": {
                                        bgcolor: isDark
                                            ? "rgba(30,64,175,0.9)"
                                            : "rgba(59,130,246,0.08)",
                                    },
                                }}
                            >
                                <FilterAltIcon fontSize="small" />
                            </IconButton>

                            <IconButton
                                size="small"
                                sx={{
                                    borderRadius: 2,
                                    px: 1.2,
                                    bgcolor: isDark
                                        ? "rgba(15,23,42,0.9)"
                                        : "rgba(255,255,255,0.9)",
                                    border: isDark
                                        ? "1px solid rgba(148,163,184,0.45)"
                                        : "1px solid rgba(148,163,184,0.35)",
                                    boxShadow: "0 0 12px rgba(15,23,42,0.3)",
                                    "&:hover": {
                                        bgcolor: isDark
                                            ? "rgba(30,64,175,0.9)"
                                            : "rgba(59,130,246,0.08)",
                                    },
                                }}
                            >
                                <MyLocationIcon fontSize="small" />
                            </IconButton>

                            <IconButton
                                size="small"
                                sx={{
                                    borderRadius: 2,
                                    px: 1.2,
                                    bgcolor: isDark ? "primary.main" : "primary.main",
                                    color: "primary.contrastText",
                                    boxShadow: "0 10px 25px rgba(37,99,235,0.55)",
                                    "&:hover": {
                                        bgcolor: "primary.dark",
                                    },
                                }}
                            >
                                <RefreshIcon fontSize="small" />
                            </IconButton>
                        </Stack>
                    </Stack>

                    {/* Map card */}
                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            overflow: "hidden",
                            bgcolor: isDark ? "rgba(15,23,42,0.95)" : "rgba(255,255,255,0.96)",
                            border: isDark
                                ? "1px solid rgba(148,163,184,0.4)"
                                : "1px solid rgba(191,219,254,0.9)",
                            boxShadow: isDark
                                ? "0 24px 60px rgba(15,23,42,0.9)"
                                : "0 20px 50px rgba(15,23,42,0.18)",
                            backdropFilter: "blur(10px)",
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
