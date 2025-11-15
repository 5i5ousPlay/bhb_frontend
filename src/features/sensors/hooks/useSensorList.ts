import {useEffect, useState} from "react";
import {fetchSensorList} from "../api/sensorApi";
import {PaginatedSensorListResponse} from "../types";


export function useSensorList(page: number, pageSize: number) {
    const [data, setData] = useState<PaginatedSensorListResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            try {
                const sensorList = await fetchSensorList(page, pageSize);
                if (!cancelled) {
                    setData(sensorList);
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
    }, [page, pageSize]);

    return { data, loading, error };
}