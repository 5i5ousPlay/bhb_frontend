import {
    Drawer,
    Toolbar,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Box,
    useTheme,
    IconButton,
    Tooltip,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import MapIcon from "@mui/icons-material/Map";
import SensorsIcon from "@mui/icons-material/Sensors";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import WaterIcon from "@mui/icons-material/Water";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import React from "react";
import { ColorModeContext } from "../index"; // adjust path if needed

type NavItem = {
    label: string;
    icon: React.ElementType;
    path: string;
};

export const drawerWidth = 250;

const navItems: NavItem[] = [
    { label: "Dashboard", icon: DashboardIcon, path: "/" },
    { label: "Map", icon: MapIcon, path: "/map" },
    { label: "Sensors", icon: SensorsIcon, path: "/sensors" },
    { label: "Alerts", icon: NotificationImportantIcon, path: "/alerts" },
];

export function DesktopSidebar() {
    const theme = useTheme();
    const location = useLocation();
    const colorMode = React.useContext(ColorModeContext);

    const isDark = theme.palette.mode === "dark";

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    borderRight: "none",
                    background: `linear-gradient(180deg, ${
                        isDark ? "#020617" : theme.palette.primary.main
                    } 0%, ${
                        isDark ? "#0f172a" : theme.palette.background.default
                    } 55%, ${
                        isDark ? "#020617" : theme.palette.background.paper
                    } 100%)`,
                    boxShadow: "2px 0 18px rgba(15,23,42,0.4)",
                    color: isDark
                        ? theme.palette.grey[100]
                        : theme.palette.grey[50],
                },
            }}
            variant="permanent"
            anchor="left"
        >
            {/* Brand header + mode toggle */}
            <Toolbar
                sx={{
                    minHeight: 72,
                    px: 2.0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1.5,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                        sx={{
                            width: 36,
                            height: 36,
                            borderRadius: "16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: isDark
                                ? "primary.main"
                                : "rgba(255,255,255,0.18)",
                            boxShadow: "0 0 12px rgba(56,189,248,0.5)",
                        }}
                    >
                        <WaterIcon fontSize="small" />
                    </Box>

                    {/* Text block */}
                    <Box sx={{ lineHeight: 1 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: 0.5,
                                lineHeight: 1,        // tighten
                                mb: 0.2,              // small bottom gap
                            }}
                        >
                            Bahaba
                        </Typography>

                        <Typography
                            variant="caption"
                            sx={{
                                opacity: 0.8,
                                fontSize: 9,
                                lineHeight: 1,        // remove extra top spacing
                                mt: -0.3,             // pull text upward slightly
                            }}
                        >
                            Flood Monitoring Console
                        </Typography>
                    </Box>
                </Box>


                <Tooltip
                    title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                    <IconButton
                        size="small"
                        onClick={colorMode.toggleColorMode}
                        sx={{
                            bgcolor: isDark
                                ? "rgba(15,23,42,0.9)"
                                : "rgba(255,255,255,0.9)",
                            border: isDark
                                ? "1px solid rgba(148,163,184,0.5)"
                                : "1px solid rgba(148,163,184,0.4)",
                            "&:hover": {
                                bgcolor: isDark
                                    ? "rgba(30,64,175,0.9)"
                                    : "rgba(59,130,246,0.08)",
                            },
                        }}
                    >
                        {isDark ? (
                            <LightModeIcon fontSize="small" />
                        ) : (
                            <DarkModeIcon fontSize="small" />
                        )}
                    </IconButton>
                </Tooltip>
            </Toolbar>

            <Divider
                sx={{
                    borderColor: isDark
                        ? "rgba(148,163,184,0.35)"
                        : "rgba(255,255,255,0.35)",
                }}
            />

            <Box sx={{ px: 1.5, pt: 1.5 }}>
                <Typography
                    variant="overline"
                    sx={{
                        fontSize: 10,
                        letterSpacing: 1.2,
                        textTransform: "uppercase",
                        opacity: 0.7,
                    }}
                >
                    Navigation
                </Typography>
            </Box>

            <List sx={{ mt: 0.5 }}>
                {navItems.map(({ label, icon: Icon, path }) => {
                    const isActive =
                        path === "/"
                            ? location.pathname === "/"
                            : location.pathname.startsWith(path);

                    return (
                        <ListItem key={label} disablePadding sx={{ px: 1 }}>
                            <ListItemButton
                                component={Link}
                                to={path}
                                selected={isActive}
                                sx={{
                                    borderRadius: 2,
                                    px: 1.5,
                                    py: 0.9,
                                    mb: 0.5,
                                    transition: "all 0.2s ease",
                                    "& .MuiListItemIcon-root": {
                                        minWidth: 32,
                                    },
                                    "&.Mui-selected": {
                                        bgcolor: isDark
                                            ? "rgba(56,189,248,0.16)"
                                            : "rgba(59,130,246,0.12)",
                                        color: isDark
                                            ? "#e0f2fe"
                                            : theme.palette.primary.dark,
                                        "& .MuiListItemIcon-root": {
                                            color: "inherit",
                                        },
                                    },
                                    "&:hover": {
                                        bgcolor: isDark
                                            ? "rgba(148,163,184,0.18)"
                                            : "rgba(15,23,42,0.06)",
                                        transform: "translateX(2px)",
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: isActive
                                            ? "inherit"
                                            : isDark
                                                ? "rgba(148,163,184,0.9)"
                                                : "rgba(15,23,42,0.7)",
                                    }}
                                >
                                    <Icon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={label}
                                    primaryTypographyProps={{
                                        fontSize: 14,
                                        fontWeight: isActive ? 600 : 500,
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
}
