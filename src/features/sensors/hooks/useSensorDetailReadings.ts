import { useEffect, useState } from "react";
import { fetchSensorDetailReadings } from "../api/sensorApi";
import { ReadingSensorHistory } from "../types";


export function useSensorDetailReadings(pollInterval = 5000, sensorId?: string) {
    const [readings, setReadings] = useState<ReadingSensorHistory>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    async function load() {
        try {
            const sensorReadings = await fetchSensorDetailReadings(sensorId);
            setReadings(sensorReadings);
            setError(null);
        } catch (err) {
            setError(err as Error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
        const id =  setInterval(load, pollInterval);
        return () => clearInterval(id)
    }, [pollInterval]);

    return { readings, loading, error, refetch: load };
}

