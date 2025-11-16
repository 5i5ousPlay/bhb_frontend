import { useEffect, useState, useCallback } from "react";
import { FloodTrend } from "../types";
import { fetchFloodTrend } from "../api/dashboardApi";

export function useFloodTrend(mode: string, pollInterval: number = 5000) {
    const [data, setData] = useState<FloodTrend | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        try {
            const floodTrend = await fetchFloodTrend(mode);
            setData(floodTrend);
            setError(null);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [mode]);

    useEffect(() => {
        let cancelled = false;

        async function loadOnce() {
            if (cancelled) return;
            try {
                const floodTrend = await fetchFloodTrend(mode);
                if (!cancelled) {
                    setData(floodTrend);
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) setError(err as Error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        // initial load
        loadOnce();

        // polling
        const id = setInterval(() => {
            loadOnce();
        }, pollInterval);

        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, [mode, pollInterval]);

    return { data, loading, error, refetch };
}
