import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// 1) Create a context to expose toggle function
export const ColorModeContext = React.createContext({
    toggleColorMode: () => {},
});

function Root() {
    const [mode, setMode] = React.useState<"light" | "dark">("dark");

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prev) => (prev === "light" ? "dark" : "dark" ? "light" : "dark"));
            },
        }),
        []
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: { main: "#1976d2" },
                    secondary: { main: "#009688" },
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);
