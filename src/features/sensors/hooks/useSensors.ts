import { useEffect, useState } from "react";
import { fetchSensors } from "../api/sensorApi";
import { SensorFeatureCollection } from "../types";


export function useSensors(pollInterval = 5000) {
    const [data, setData] = useState<SensorFeatureCollection | null>(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null)

    async function load() {
        try {
            const sensors = await fetchSensors();
            setData(sensors);
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
