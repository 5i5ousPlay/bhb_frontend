import { useEffect, useState } from "react";
import { AlertListResults } from "../../alerts/types";
import { fetchRecentAlerts } from "../api/dashboardApi";


export function useRecentAlerts (pollInterval = 5000) {
    const [data, setData] = useState<AlertListResults | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    async function load() {
        try {
            const recentAlerts = await fetchRecentAlerts();
            setData(recentAlerts);
            setError(null);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
        const id = setInterval(load, pollInterval);
        return () => clearInterval(id)
    }, [pollInterval]);

    return { data, loading, error, refetch: load };
}
