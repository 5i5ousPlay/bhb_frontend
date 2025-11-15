import {Drawer, Toolbar, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import MapIcon from '@mui/icons-material/Map';
import SensorsIcon from '@mui/icons-material/Sensors';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import WaterIcon from '@mui/icons-material/Water';

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
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant={"permanent"}
            anchor={"left"}
        >
            <Toolbar>
                <WaterIcon />
                <Typography variant="h6" padding={2}>
                    Bahaba
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {navItems.map(({ label, icon: Icon, path}) => (
                    <ListItem key={label} disablePadding>
                        <ListItemButton component={Link} to={path}>
                            <ListItemIcon>
                                <Icon />
                            </ListItemIcon>
                            <ListItemText primary={label}/>
                        </ListItemButton>
                    </ListItem>
                    )
                )
                }
            </List>
        </Drawer>
    )
}
