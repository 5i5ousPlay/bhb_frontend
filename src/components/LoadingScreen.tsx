import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

export function LoadingScreen() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    return (
        <Box
            sx={{
                height: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",

                bgcolor: isDark ? "#020617" : "#e5edff",
                backgroundImage: isDark
                    ? "radial-gradient(circle at 0% 0%, rgba(56,189,248,0.15) 0, transparent 45%), radial-gradient(circle at 100% 100%, rgba(59,130,246,0.12) 0, transparent 50%)"
                    : "radial-gradient(circle at 0% 0%, rgba(59,130,246,0.15) 0, transparent 45%), radial-gradient(circle at 100% 100%, rgba(56,189,248,0.18) 0, transparent 50%)",

                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Pulsing ring behind the spinner */}
            <Box
                sx={{
                    position: "absolute",
                    width: 140,
                    height: 140,
                    borderRadius: "50%",
                    background:
                        isDark
                            ? "rgba(56,189,248,0.08)"
                            : "rgba(59,130,246,0.12)",
                    animation: "pulse 2s infinite ease-in-out",
                    "@keyframes pulse": {
                        "0%": { transform: "scale(0.85)", opacity: 0.6 },
                        "50%": { transform: "scale(1.05)", opacity: 0.25 },
                        "100%": { transform: "scale(0.85)", opacity: 0.6 },
                    },
                }}
            />

            {/* The actual spinner */}
            <CircularProgress
                size={64}
                thickness={4.5}
                sx={{
                    zIndex: 10,
                    color: isDark ? "cyan.400" : "primary.main",
                    filter: isDark
                        ? "drop-shadow(0px 0px 12px rgba(56,189,248,0.55))"
                        : "drop-shadow(0px 0px 8px rgba(59,130,246,0.35))",
                }}
            />

            {/* Loading text */}
            <Typography
                variant="body2"
                sx={{
                    mt: 2,
                    fontSize: 14,
                    letterSpacing: 0.5,
                    opacity: 0.75,
                    color: isDark ? "grey.300" : "text.secondary",
                }}
            >
                Loading data…
            </Typography>
        </Box>
    );
}
