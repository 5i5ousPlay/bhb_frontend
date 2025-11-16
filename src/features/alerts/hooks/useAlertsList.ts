import {useEffect, useState} from "react";
import {fetchAlertsList} from "../api/alertsApi";
import {PaginatedAlertListResponse} from "../types";


export function useAlertsList(pageNumber: number, pageSize: number) {
    const [data, setData] = useState<PaginatedAlertListResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            try {
                const alertsList = await fetchAlertsList(pageNumber, pageSize);
                if (!cancelled) {
                    setData(alertsList);
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) setError(err as Error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();

        return () => {
            cancelled = true;
        };

    }, [pageNumber, pageSize]);

    return { data, loading, error };
}
