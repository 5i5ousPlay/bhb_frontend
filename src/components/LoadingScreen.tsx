import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function LoadingScreen() {
    return (
        <Box
            sx={{
                height: "100vh",
                width: "100%",
                display: "flex",
                alignItems: "center",          // vertical centering
                justifyContent: "center",      // horizontal centering
                p: 2,
            }}
        >
            <CircularProgress />
        </Box>
    );
}