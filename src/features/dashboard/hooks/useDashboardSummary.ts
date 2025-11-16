import { useState, useEffect } from "react";
import { fetchDashboardSummary } from "../api/dashboardApi";
import {DashboardSummaryResponse} from "../types";


export function useDashboardSummary(pollInterval= 5000) {
    const [data, setData] = useState<DashboardSummaryResponse | null>(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    async function load (cancelled: boolean) {
        try {
            const dashboardSummary = await fetchDashboardSummary();
            if (!cancelled) {
                setData(dashboardSummary);
                setError(null);
            }
        } catch (err) {
            if (!cancelled) setError(err as Error);
        } finally {
            if (!cancelled) setLoading(false);
        }
    }

    useEffect(() => {
        let cancelled = false
        load(cancelled);
        const id = setInterval(load, pollInterval)
        return () => {
            clearInterval(id);
            cancelled = true;
        };
    }, [pollInterval]);

    return { data, loading, error, refetch: load };
}
