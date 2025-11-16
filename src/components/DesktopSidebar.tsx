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
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import MapIcon from "@mui/icons-material/Map";
import SensorsIcon from "@mui/icons-material/Sensors";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import WaterIcon from "@mui/icons-material/Water";

type NavItem = {
    label: string;
    icon: React.ElementType;
    path: string;
};

export const drawerWidth = 240;

const navItems: NavItem[] = [
    { label: "Dashboard", icon: DashboardIcon, path: "/" },
    { label: "Map", icon: MapIcon, path: "/map" },
    { label: "Sensors", icon: SensorsIcon, path: "/sensors" },
    { label: "Alerts", icon: NotificationImportantIcon, path: "/alerts" },
];

export function DesktopSidebar() {
    const theme = useTheme();
    const location = useLocation();

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    borderRight: "none",
                    // subtle gradient background
                    background: `linear-gradient(180deg, ${
                        theme.palette.mode === "dark"
                            ? "#020617"
                            : theme.palette.primary.main
                    } 0%, ${
                        theme.palette.mode === "dark"
                            ? "#0f172a"
                            : theme.palette.background.default
                    } 55%, ${
                        theme.palette.mode === "dark"
                            ? "#020617"
                            : theme.palette.background.paper
                    } 100%)`,
                    boxShadow: "2px 0 18px rgba(15,23,42,0.4)",
                    color:
                        theme.palette.mode === "dark"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[50],
                },
            }}
            variant="permanent"
            anchor="left"
        >
            {/* Brand header */}
            <Toolbar
                sx={{
                    minHeight: 72,
                    px: 2.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                }}
            >
                <Box
                    sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor:
                            theme.palette.mode === "dark"
                                ? "primary.main"
                                : "rgba(255,255,255,0.18)",
                        boxShadow: "0 0 12px rgba(56,189,248,0.5)",
                    }}
                >
                    <WaterIcon fontSize="small" />
                </Box>
                <Box>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, letterSpacing: 0.5 }}
                    >
                        Bahaba
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ opacity: 0.8, fontSize: 11 }}
                    >
                        Flood Monitoring Console
                    </Typography>
                </Box>
            </Toolbar>

            <Divider
                sx={{
                    borderColor:
                        theme.palette.mode === "dark"
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
                                        bgcolor:
                                            theme.palette.mode === "dark"
                                                ? "rgba(56,189,248,0.16)"
                                                : "rgba(59,130,246,0.12)",
                                        color:
                                            theme.palette.mode === "dark"
                                                ? "#e0f2fe"
                                                : theme.palette.primary.dark,
                                        "& .MuiListItemIcon-root": {
                                            color: "inherit",
                                        },
                                    },
                                    "&:hover": {
                                        bgcolor:
                                            theme.palette.mode === "dark"
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
                                            : theme.palette.mode === "dark"
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
