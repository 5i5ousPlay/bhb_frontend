import {
    Box,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button,
    Collapse,
} from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { useState } from "react";
import type { SensorAlertList } from "../../sensors/types";

export function SensorAlertsCard({ alerts }: { alerts: SensorAlertList }) {
    const [expanded, setExpanded] = useState(false);

    const MAX_VISIBLE = 10;

    const visibleAlerts = expanded
        ? alerts
        : alerts.slice(0, MAX_VISIBLE);

    return (
        <Paper
            elevation={3}
            sx={{
                borderRadius: 3,
                p: 2,
                height: "100%",
            }}
        >
            <Box display="flex" alignItems="center" gap={1} mb={1}>
                <ReportProblemIcon color="warning" fontSize="small" />
                <Typography variant="subtitle1">Related Alerts</Typography>
            </Box>

            {alerts.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    No alerts have been triggered for this sensor yet.
                </Typography>
            ) : (
                <>
                    <List dense>
                        {visibleAlerts.map((alert, idx) => (
                            <Box key={idx}>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                        primary={alert.message}
                                        secondary={new Date(alert.reported_on).toLocaleString()}
                                    />
                                </ListItem>
                                {idx < visibleAlerts.length - 1 && (
                                    <Divider component="li" />
                                )}
                            </Box>
                        ))}
                    </List>

                    {/* Show more / less button */}
                    {alerts.length > MAX_VISIBLE && (
                        <Box display="flex" justifyContent="center" mt={1}>
                            <Button
                                size="small"
                                onClick={() => setExpanded((prev) => !prev)}
                            >
                                {expanded
                                    ? "Show Less"
                                    : `Show ${alerts.length - MAX_VISIBLE} More`}
                            </Button>
                        </Box>
                    )}
                </>
            )}
        </Paper>
    );
}
