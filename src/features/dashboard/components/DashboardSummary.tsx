import { Grid, Card, CardContent, Typography, useTheme } from "@mui/material";

export function DashboardSummary() {
    const theme = useTheme();

    // Theme-responsive accent color
    const accentBg = theme.palette.mode === "dark" ? "#00c853" : "#009d3a";
    const textOnAccent = theme.palette.getContrastText(accentBg);

    return (
        <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={3} sx={{ p: 2 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Summary
                </Typography>

                <Grid container spacing={2}>
                    {/* Active Sensors */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Card
                            elevation={4}
                            sx={{
                                background: 'linear-gradient(45deg, #009200 30%, #3af94d 90%)',
                                borderRadius: 2
                            }}
                        >
                            <CardContent>
                                <Typography variant="subtitle1">
                                    Active Sensors
                                </Typography>
                                <Typography variant="h3" align="center" fontWeight={700}>
                                    12
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Flooded Sensors */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Card
                            elevation={2}
                            sx={{
                                background: 'linear-gradient(45deg, #94005b 30%, #f93a86 90%)',
                                borderRadius: 2
                            }}>
                            <CardContent>
                                <Typography variant="subtitle1">Flooded Sensors</Typography>
                                <Typography variant="h4" align="center">3</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Critical Sensors */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Card
                            elevation={2}
                            sx={{ borderRadius: 2,
                                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
                            }}>
                            <CardContent>
                                <Typography variant="subtitle1">Critical Level Sensors</Typography>
                                <Typography variant="h4" align="center">1</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Offline Sensors */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Card
                            elevation={2}
                            sx={{ borderRadius: 2,
                                background: 'linear-gradient(45deg, #006871 30%, #3ae6f9 90%)'
                        }}>
                            <CardContent>
                                <Typography variant="subtitle1">Offline Sensors</Typography>
                                <Typography variant="h4" align="center">5</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Alerts */}
                    <Grid size={{ xs: 12 }}>
                        <Card
                            elevation={2}
                            sx={{ borderRadius: 2,
                                background: 'linear-gradient(45deg, #f3852d 30%, #f9ac3a 90%)'
                        }}
                        >
                            <CardContent>
                                <Typography variant="subtitle1">
                                    Alerts in the Last 24 Hours
                                </Typography>
                                <Typography variant="h4" align="center">8</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
}
